import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { faBookmark, faCalendarDays, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import config from '../../utils/config';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Footer from './footer';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { FacebookIcon, TwitterIcon, WhatsappIcon } from 'react-share';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailPengumuman = () => {
  const [pengumuman, setPengumuman] = useState({});
  const [pengumumanTerbaru, setPengumumanTerbaru] = useState([]);
  const params = useParams();

  const getPengumumanById = async () => {
    const response = await axios.get(`${config.BASE_URL}/announcements/${params.id}`);
    setPengumuman(response.data.data);
  };

  const getPengumuman = async () => {
    const response = await axios.get(`${config.BASE_URL}/announcements`);

    const allData = response.data.data;

    const Data = allData.slice(0, 3);

    setPengumumanTerbaru(Data);
  };

  useEffect(() => {
    getPengumumanById();
    getPengumuman();
  }, [params.id]);

  useEffect(() => {
    Aos.init();
  }, []);

  const shareUrl = window.location.href;

  return (
    <>
      <div className="detailpengumuman">
        <p>
          Pengumuman <FontAwesomeIcon className="icon" icon={faChevronRight} /> Detail Pengumuman
        </p>
        <div className="box">
          <div className="first">
            <h1>{pengumuman.title}</h1>
            <div className="info">
              <p>
                <FontAwesomeIcon className="icon" icon={faCalendarDays} /> {pengumuman.formattedDate}
              </p>
            </div>
            <iframe src={pengumuman.fileUrl} allow="autoplay" className="showFile"></iframe>
            <p className="paragraf" data-aos="fade-up" data-aos-once="true" dangerouslySetInnerHTML={{ __html: pengumuman.desc }} />
            <div className="share-buttons" data-aos="fade-up" data-aos-once="true">
              <h3>Bagikan ke:</h3>
              <FacebookShareButton url={shareUrl} quote={pengumuman.title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={pengumuman.title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <WhatsappShareButton url={shareUrl} title={pengumuman.title}>
                <WhatsappIcon size={32} round />
              </WhatsappShareButton>
            </div>
          </div>
        </div>

        <div className="second">
          <h1>Pengumuman Terbaru</h1>
          {pengumumanTerbaru.map((item) => (
            <Link className="card" data-aos="fade-up" data-aos-once="true" to={`/pengumuman/${item._id}`}>
              <h3>{item.title}</h3>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DetailPengumuman;
