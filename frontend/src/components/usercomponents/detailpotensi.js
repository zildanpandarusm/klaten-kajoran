import React, { useEffect, useState } from 'react';
import { faArrowRight, faChevronRight, faMapLocation, faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import config from '../../utils/config';
import Aos from 'aos';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import 'aos/dist/aos.css';
import axios from 'axios';
import Footer from './footer';
import { useParams, useNavigate } from 'react-router-dom';

const DetailPotensi = () => {
  const [potensi, setPotensi] = useState({});
  const [potensiTerbaru, setPotensiTerbaru] = useState([]);
  const [potensiTerkait, setPotensiTerkait] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/potensi/${id}`);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    getPotensiById();
    getPotensi();
  }, [params.id]);

  useEffect(() => {
    if (potensi) {
      getPotensiTerkait();
      console.log(potensi);
    }
  }, [potensi.category]);

  const shareUrl = window.location.href;

  const getPotensiById = async () => {
    const response = await axios.get(`${config.BASE_URL}/potentials/${params.id}`);
    setPotensi(response.data.data);
  };

  const getPotensi = async () => {
    const response = await axios.get(`${config.BASE_URL}/potentials`);
    setPotensiTerbaru(response.data.data);
  };

  const getPotensiTerkait = async () => {
    const response = await axios.get(`${config.BASE_URL}/potentials/kategori/${potensi.category}/${params.id}`);
    setPotensiTerkait(response.data.data);
  };

  return (
    <>
      <div className="detailpotensi">
        <p>
          Potensi <FontAwesomeIcon className="icon" icon={faChevronRight} /> Detail Potensi
        </p>
        <div className="box">
          <div className="first">
            <h1>{potensi.title}</h1>
            <div className="info">
              <Link to={potensi.maps} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon className="icon" icon={faMapLocation} /> Lihat Lokasi
              </Link>
              <p>
                <FontAwesomeIcon className="icon" icon={faPhone} /> {potensi.phone}
              </p>
            </div>
            <img src={potensi.imageUrl} alt="kajoran" data-aos="fade-up" data-aos-once="true" />
            <p className="paragraf" data-aos="fade-up" data-aos-once="true" dangerouslySetInnerHTML={{ __html: potensi.desc }} />
            <div className="share-buttons" data-aos="fade-up" data-aos-once="true">
              <h3>Bagikan ke:</h3>
              <FacebookShareButton url={shareUrl} quote={potensi.title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={potensi.title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton url={shareUrl} title={potensi.title}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>

          <div className="second">
            <h1>Potensi Terbaru</h1>
            {potensiTerbaru.map((item) => (
              <Link className="card" data-aos="fade-up" data-aos-once="true" to={`/potensi/${item._id}`} onClick={() => handleClick(item._id)}>
                <h3>{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
        <div className="third">
          <h1>Potensi Terkait</h1>
          <div className="box">
            {potensiTerkait.length > 0 ? (
              potensiTerkait.map((item) => (
                <Link key={item._id} className="card" data-aos="zoom-in-down" data-aos-once="true" to={`/potensi/${item._id}`} onClick={() => handleClick(item._id)}>
                  <img src={item.imageUrl} alt="kajoran" />
                  <div className="write">
                    <h2>{item.title}</h2>
                    <h3>{item.category}</h3>
                    <div className="bottom">
                      <div className="btn">
                        <Link>
                          <FontAwesomeIcon className="icon" icon={faArrowRight} />
                        </Link>
                      </div>
                      <p>Baca Selengkapnya</p>
                    </div>
                  </div>
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

export default DetailPotensi;
