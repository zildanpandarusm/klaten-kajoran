import React, { useEffect, useState } from 'react';
import { faBars, faEnvelope, faPhone, faX, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import '../css/userstyle.css';
import { useNavigate } from 'react-router-dom';
import config from '../../utils/config';
import axios from 'axios';

const Navbar = ({ page }) => {
  const [aktif, setAktif] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [email, setEmail] = useState('');
  const [telp, setTelp] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleBar = () => {
    const secNav = document.querySelector('.navbar .secondSide');

    setAktif(!aktif);
    if (aktif) {
      secNav.classList.remove('aktif');
    } else {
      secNav.classList.add('aktif');
    }
  };

  const getAbout = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/about`);
      setEmail(response.data.data[0].email);
      setTelp(response.data.data[0].telp);

      console.log(response.data.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAbout();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  window.onscroll = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 768) {
      const nav = document.querySelector('.navbar .navTop');

      if (window.pageYOffset > 200) {
        nav.classList.add('fixed');
      } else if (window.pageYOffset <= 45) {
        nav.classList.remove('fixed');
      }
    }
    const navBot = document.querySelector('.navbar .navBot');
    if (window.pageYOffset > 1) {
      navBot.classList.add('fixed');
    } else if (window.pageYOffset < 1) {
      navBot.classList.remove('fixed');
    }
  };

  const showBgNavbar = (page) => {
    const nav = document.querySelector('.navbar');

    // Remove all background classes
    nav.classList.remove('navbar-home', 'navbar-about', 'navbar-contact');

    switch (page) {
      case 'home':
        nav.classList.add('navbar-home');
        break;
      case 'tentang':
        nav.classList.add('navbar-about');
        break;
      case 'berita':
        nav.classList.add('navbar-contact');
        break;
      default:
        nav.classList.add('navbar-contact');
        break;
    }
  };

  useEffect(() => {
    const nav = document.querySelector('.navbar');
    showBgNavbar(page);
    if (!nav) return;

    const bgClasses = ['navbar-home', 'navbar-about', 'navbar-contact'];
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      nav.classList.remove(...bgClasses);

      currentIndex = (currentIndex + 1) % bgClasses.length;
      nav.classList.add(bgClasses[currentIndex]);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div className="navbar">
        <div className="navNol">
          <div className="info">
            <h2>
              <FontAwesomeIcon icon={faEnvelope} /> {email}
            </h2>
            <h2>
              <FontAwesomeIcon icon={faPhone} /> {telp}
            </h2>
          </div>
          <h2>
            <FontAwesomeIcon icon={faMapLocationDot} /> Kabupaten Klaten
          </h2>
        </div>
        <div className="navTop">
          <div className="firstSide">
            <div className="logo">
              <img src={`${config.IMAGE_BASE_URL}/logo_klaten.png`} alt="logo" />
              <h2>Desa Kajoran</h2>
            </div>
          </div>
          <div className="secondSide">
            <li>
              <Link to="/" className={page === 'home' ? 'aktif' : ''}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/tentang" className={page === 'tentang' ? 'aktif' : ''}>
                Tentang
              </Link>
            </li>
            <li>
              <Link to="/berita" className={page === 'berita' ? 'aktif' : ''}>
                Berita
              </Link>
            </li>
            <li>
              <Link to="/potensi" className={page === 'potensi' ? 'aktif' : ''}>
                Potensi
              </Link>
            </li>
            <li>
              <Link to="/pengumuman" className={page === 'pengumuman' ? 'aktif' : ''}>
                Pengumuman
              </Link>
            </li>
            <li>
              <Link to="/admin" className="adm">
                Admin
              </Link>
            </li>
          </div>
          <FontAwesomeIcon className={aktif ? 'iconBar iconX' : 'iconBar menubar'} icon={aktif ? faX : faBars} onClick={handleBar} />
        </div>
        <div className="navBot">
          <p>Jl.Panembahan Agung No.293, Kajoran, Kec. Klaten Sel., Kabupaten Klaten, Jawa Tengah - </p>
          <p>Jl.Panembahan Agung No.293, Kajoran, Kec. Klaten Sel., Kabupaten Klaten, Jawa Tengah - </p>
          <p>Jl.Panembahan Agung No.293, Kajoran, Kec. Klaten Sel., Kabupaten Klaten, Jawa Tengah</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
