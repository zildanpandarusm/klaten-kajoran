import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { faBookmark, faCalendarDays, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useAsyncError } from 'react-router-dom';
import config from '../../utils/config';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Footer from './footer';
import axios from 'axios';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const DetailBerita = () => {
  const params = useParams();
  const [berita, setBerita] = useState({});
  const [beritaTerbaru, setBeritaTerbaru] = useState([]);
  const [beritaTerkait, setBeritaTerkait] = useState([]);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/berita/${id}`);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    getBeritaById();
    getBerita();
  }, [params.id]); // Depend on params.id to refetch data when route changes

  useEffect(() => {
    if (berita) {
      getBeritaTerkait();
      console.log(berita);
    }
  }, [berita.category]);

  const shareUrl = window.location.href;
  const title = 'Es Teh Gula Murni Bu Carik';

  const getBeritaById = async () => {
    const response = await axios.get(`${config.BASE_URL}/posts/${params.id}`);
    setBerita(response.data.data);
  };

  const getBerita = async () => {
    const response = await axios.get(`${config.BASE_URL}/posts`);
    setBeritaTerbaru(response.data.data);
  };

  const getBeritaTerkait = async () => {
    const response = await axios.get(`${config.BASE_URL}/posts/kategori/${berita.category}/${params.id}`);
    setBeritaTerkait(response.data.data);
  };

  return (
    <>
      <div className="detailberita">
        <p>
          Detail Berita <FontAwesomeIcon className="icon" icon={faChevronRight} /> Berita Terbaru
        </p>
        <div className="box">
          <div className="first">
            <h1>{berita.title}</h1>
            <div className="info">
              <p>
                <FontAwesomeIcon className="icon" icon={faBookmark} /> {berita.category}
              </p>
              <p>
                <FontAwesomeIcon className="icon" icon={faCalendarDays} /> {berita.formattedDate}
              </p>
            </div>
            <img src={berita.imageUrl} alt="kajoran" data-aos="fade-up" data-aos-once="true" />
            <p className="paragraf" data-aos="fade-up" data-aos-once="true" dangerouslySetInnerHTML={{ __html: berita.desc }} />
            <div className="share-buttons" data-aos="fade-up" data-aos-once="true">
              <h3>Bagikan ke:</h3>
              <FacebookShareButton url={shareUrl} quote={title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton url={shareUrl} title={title}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
            <div className="third">
              <h1>Berita Terkait</h1>
              {beritaTerkait.map((item) => (
                <Link className="card" data-aos="fade-up" data-aos-once="true" to={`/berita/${item._id}`} onClick={() => handleClick(item._id)}>
                  <h3>{item.title}</h3>
                  <p>{item.formattedDate}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="second">
            <h1>Berita Terbaru</h1>
            {beritaTerbaru.map((item) => (
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

export default DetailBerita;
