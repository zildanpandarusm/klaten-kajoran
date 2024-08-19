import React, { useEffect, useState } from 'react';
import { faArrowRight, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import config from '../../utils/config';
import Aos from 'aos';
import 'aos/dist/aos.css';
import Footer from './footer';

import axios from 'axios';

const Tentang = () => {
  const [about, setAbout] = useState({});

  const getAbout = async () => {
    const response = await axios.get(`${config.BASE_URL}/about`);

    const Data = response.data.data[0];

    setAbout(Data);
  };

  window.addEventListener('resize', adjustFontSize);
  window.addEventListener('load', adjustFontSize);

  function adjustFontSize() {
    const gambar = document.querySelector('.sejarah .gambar');
    const h1 = document.querySelector('.sejarah h1');

    const gambarHeight = gambar.clientHeight;
    h1.style.fontSize = gambarHeight * 0.15 + 'px';

    const gambar2 = document.querySelector('.visimisi .gambar');
    const h12 = document.querySelector('.visimisi h1');

    const gambarHeight2 = gambar.clientHeight;
    h12.style.fontSize = gambarHeight2 * 0.15 + 'px';
  }

  useEffect(() => {
    getAbout();
  }, []);

  useEffect(() => {
    Aos.init();
    adjustFontSize();
  }, []);

  return (
    <div className="tentang">
      <div className="visimisi">
        <div className="first">
          <div className="box">
            <div className="title">
              <h2>Visi</h2>
            </div>
            <div className="card">
              <p dangerouslySetInnerHTML={{ __html: about.visi }} />
            </div>
          </div>
          <div className="box">
            <div className="title">
              <h2>Misi</h2>
            </div>
            <div className="card">
              <p dangerouslySetInnerHTML={{ __html: about.misi }} />
            </div>
          </div>
        </div>
        <div className="gambar">
          <img src={`${config.IMAGE_BASE_URL}/kajoran3.JPG`} alt="logo" />
          <h1>Visi&Misi</h1>
        </div>
      </div>
      <div className="sejarah">
        <div className="gambar">
          <img src={`${config.IMAGE_BASE_URL}/kajoran5.JPG`} alt="logo" />
          <h1>SEJARAH</h1>
        </div>
        <div className="box">
          <div className="title">
            <h2>Sejarah</h2>
          </div>
          <div className="card">
            <p dangerouslySetInnerHTML={{ __html: about.sejarah }} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Tentang;
