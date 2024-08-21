import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import config from '../../utils/config';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Footer from './footer';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Potensi = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [potensi, setPotensi] = useState([]);
  const [potensiUmkm, setPotensiUmkm] = useState([]);
  const [potensiBumdes, setPotensiBumdes] = useState([]);
  const [potensiWisata, setPotensiWisata] = useState([]);
  const itemsPerPage = 5;
  const params = useParams();

  const getPotensi = async () => {
    const response = await axios.get(`${config.BASE_URL}/potentials`);
    const allData = response.data.data;
    setPotensi(allData);
  };

  const getPotensiUmkm = async () => {
    const response = await axios.get(`${config.BASE_URL}/potentials/kategori/umkm`);

    const allData = response.data.data;

    const Data = allData.slice(0, 6);

    setPotensiUmkm(Data);
  };

  const getPotensiWisata = async () => {
    const response = await axios.get(`${config.BASE_URL}/potentials/kategori/wisata`);

    const allData = response.data.data;

    const Data = allData.slice(0, 6);
    setPotensiWisata(Data);
  };

  const getPotensiBumdes = async () => {
    const response = await axios.get(`${config.BASE_URL}/potentials/kategori/bumdes`);

    const allData = response.data.data;

    const Data = allData.slice(0, 6);
    setPotensiBumdes(Data);
  };

  useEffect(() => {
    getPotensi();
    getPotensiUmkm();
    getPotensiBumdes();
    getPotensiWisata();
  }, []);

  useEffect(() => {
    Aos.init();
  }, []);
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const currentItems = potensi.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  return (
    <>
      <div className="potensi">
        <p>
          Potensi <FontAwesomeIcon className="icon" icon={faChevronRight} /> Potensi Terbaru
        </p>
        <h1>Potensi</h1>
        <div className="box">
          {currentItems.length > 0 ? (
            currentItems.map((item, index) => (
              <Link key={index} className="card" data-aos="fade-up" data-aos-once="true" to={`/potensi/${item._id}`}>
                <h3>{item.category}</h3>
                <div className="img">
                  <img src={item.imageUrl} alt={item.title} />
                </div>

                <div className="write">
                  <h2>{item.title}</h2>
                  <p dangerouslySetInnerHTML={{ __html: item.descSingkat }} />
                  <div className="more">
                    <p>
                      Baca Selengkapnya <FontAwesomeIcon className="icon" icon={faChevronRight} />
                    </p>
                  </div>
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
              pageCount={Math.ceil(potensi.length / itemsPerPage)}
              marginPagesDisplayed={1}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        </div>
        <div className="bottom">
          <div className="column">
            <h2>UMKM Terbaru</h2>
            {potensiUmkm.length > 0 ? (
              potensiUmkm.map((item) => (
                <Link key={item._id} className="card" data-aos="fade-up" data-aos-once="true" to={`/potensi/${item._id}`}>
                  <img src={item.imageUrl} alt="logo" />
                  <h3>{item.title}</h3>
                </Link>
              ))
            ) : (
              <p>Tidak Ada Data</p>
            )}
          </div>

          <div className="column">
            <h2>Bumdes Terbaru</h2>
            {potensiBumdes.length > 0 ? (
              potensiBumdes.map((item) => (
                <Link key={item._id} className="card" data-aos="fade-up" data-aos-once="true" to={`/potensi/${item._id}`}>
                  <img src={item.imageUrl} alt="logo" />
                  <h3>{item.title}</h3>
                </Link>
              ))
            ) : (
              <p>Tidak Ada Data</p>
            )}
          </div>

          <div className="column">
            <h2>Wisata Terbaru</h2>
            {potensiWisata.length > 0 ? (
              potensiWisata.map((item) => (
                <Link key={item._id} className="card" data-aos="fade-up" data-aos-once="true" to={`/potensi/${item._id}`}>
                  <img src={item.imageUrl} alt="logo" />
                  <h3>{item.title}</h3>
                </Link>
              ))
            ) : (
              <p>Tidak Ada Data</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Potensi;
