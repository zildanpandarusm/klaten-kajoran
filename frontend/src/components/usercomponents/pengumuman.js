import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { faChevronRight, faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import config from '../../utils/config';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Footer from './footer';
import axios from 'axios';

const Pengumuman = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [announcements, setAnnouncements] = useState([]);

  const itemsPerPage = 5;

  useEffect(() => {
    Aos.init();
  }, []);

  const getAnnouncements = async () => {
    const response = await axios.get(`${config.BASE_URL}/announcements`, {
      withCredentials: true,
    });
    const allData = response.data.data;
    setAnnouncements(allData);
  };

  useEffect(() => {
    getAnnouncements();
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const currentItems = announcements.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <>
      <div className="pengumuman">
        <p>
          Pengumuman <FontAwesomeIcon className="icon" icon={faChevronRight} /> Pengumuman Terbaru
        </p>
        <h1>Pengumuman</h1>
        <div className="box">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <Link key={index} className="card" data-aos="fade-up" data-aos-once="true" to={`/pengumuman/${item._id}`}>
                <div className="write">
                  <h2>{item.title}</h2>
                  <p>
                    <FontAwesomeIcon className="icon" icon={faMapLocation} />
                    {item.formattedDate}
                  </p>
                </div>
                <div className="more">
                  <p>
                    Baca Selengkapnya <FontAwesomeIcon className="icon" icon={faChevronRight} />
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>Tidak Ada Data</p>
          )}
          <div className="paginate">
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={Math.ceil(announcements.length / itemsPerPage)}
              marginPagesDisplayed={1}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pengumuman;
