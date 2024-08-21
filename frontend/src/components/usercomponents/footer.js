import React, { useEffect, useState } from 'react';
import { faBars, faEnvelope, faPhone, faX, faMapLocationDot, faCopyright } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import '../css/userstyle.css';
import { useNavigate } from 'react-router-dom';
import config from '../../utils/config';
import axios from 'axios';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [telp, setTelp] = useState('');
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
  return (
    <div>
      <div className="footer">
        <div className="top">
          <div className="first">
            <img src={`${config.IMAGE_BASE_URL}/logo_klaten.png`} alt="logo" />
            <h2>Desa Kajoran</h2>
          </div>
          <div className="second">
            <div className="link">
              <p>Menu</p>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/tentang">Tentang</Link>
              </li>
              <li>
                <Link to="/berita">Berita</Link>
              </li>
              <li>
                <Link to="/potensi">Potensi</Link>
              </li>
              <li>
                <Link to="/pengumuman">Pengumuman</Link>
              </li>
            </div>
          </div>
          <div className="third">
            <div className="info">
              <h2>
                <FontAwesomeIcon icon={faEnvelope} /> {email}
              </h2>
              <h2>
                <FontAwesomeIcon icon={faPhone} /> {telp}
              </h2>
            </div>
          </div>
        </div>
        <div className="bottom">
          <p>
            2024 <FontAwesomeIcon className="icon" icon={faCopyright} /> Desa Kajoran
          </p>
          <p>Powered by KKN 114 UIN Suka Kelompok 213</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
