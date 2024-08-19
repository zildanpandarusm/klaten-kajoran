import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import config from '../../utils/config';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Footer from './footer';
import axios from 'axios';

const Berita = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [berita, setBerita] = useState([]);

  const getBerita = async () => {
    const response = await axios.get(`${config.BASE_URL}/posts`);
    const allData = response.data.data;
    setBerita(allData);
  };

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    getBerita();
  }, []);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const currentItems = berita.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <>
      <div className="berita">
        <p>
          Berita <FontAwesomeIcon className="icon" icon={faChevronRight} /> Berita Terbaru
        </p>
        <div className="box">
          <div className="first">
            <h1>Berita</h1>
            {currentItems.map((item, index) => (
              <Link key={index} className="card" data-aos="fade-up" data-aos-once="true" to={`/berita/${item._id}`}>
                <img src={item.imageUrl} alt={item.title} />
                <div className="write">
                  <h2>{item.title}</h2>
                  <h3>{item.date}</h3>
                  <p dangerouslySetInnerHTML={{ __html: item.descSingkat }} />
                  <div className="more">
                    <p>
                      Baca Selengkapnya <FontAwesomeIcon className="icon" icon={faChevronRight} />
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            <div className="paginate">
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={Math.ceil(berita.length / itemsPerPage)}
                marginPagesDisplayed={1}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
              />
            </div>
          </div>

          <div className="second">
            <h1>Berita Terbaru</h1>
            {berita.map((item) => (
              <Link className="card" data-aos="fade-up" data-aos-once="true" to={`/berita/${item._id}`}>
                <h3>{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Berita;
