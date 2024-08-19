import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faRightFromBracket, faNewspaper, faScroll, faStore, faNoteSticky, faChevronDown, faChevronRight, faMountainSun, faLandmark, faClipboard, faSitemap } from '@fortawesome/free-solid-svg-icons';
import '../css/AdminStyle.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserLogout, reset } from '../../features/userauth';
import config from '../../utils/config';

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;

  const [aktif, setAktif] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmenu = () => {
    const submenu = document.querySelector('aside .submenu');
    const parentSubmenu = document.querySelector('.parentSubmenu');

    parentSubmenu.addEventListener('click', function () {
      if (!submenu.classList.contains('aktif')) {
        submenu.classList.add('aktif');
        setAktif(true);
      } else {
        submenu.classList.remove('aktif');
        setAktif(false);
      }
    });
  };

  const handleLogout = () => {
    dispatch(UserLogout());
    dispatch(reset());
    navigate('/admin/login');
  };

  useEffect(() => {
    handleSubmenu();
  }, [handleSubmenu]);

  return (
    <aside>
      <div className="logo">
        <img src={`${config.IMAGE_BASE_URL}/uin_logo.png`} alt="logo" />
        <img src={`${config.IMAGE_BASE_URL}/logo_klaten.png`} alt="logo" />
        {/* <h1>Klaten</h1> */}
      </div>
      <ul>
        <p>Menu</p>
        <Link to="/admin" className={`menu ${pathname === '/admin' ? 'active' : ''}`}>
          <FontAwesomeIcon className="icon" icon={faHouse} />
          <p>Dashboard</p>
        </Link>
        <Link className="menu parentSubmenu">
          <FontAwesomeIcon className="icon" icon={faNoteSticky} />
          <p>Tentang</p>
          {aktif ? <FontAwesomeIcon className="iconP" icon={faChevronDown} /> : <FontAwesomeIcon className="iconP" icon={faChevronRight} />}
        </Link>
        <div className={`submenu ${pathname === '/admin/profil' || pathname === '/admin/sejarah' || pathname === '/admin/visimisi' ? 'active aktif' : ''}`}>
          <Link to="/admin/profil" className={`menu ${pathname === '/admin/profil' ? 'active' : ''}`}>
            <FontAwesomeIcon className="icon" icon={faMountainSun} />
            <p>Profil</p>
          </Link>
          <Link to="/admin/sejarah" className={`menu ${pathname === '/admin/sejarah' ? 'active' : ''}`}>
            <FontAwesomeIcon className="icon" icon={faLandmark} />
            <p>Sejarah</p>
          </Link>
          <Link to="/admin/visimisi" className={`menu ${pathname === '/admin/visimisi' ? 'active' : ''}`}>
            <FontAwesomeIcon className="icon" icon={faClipboard} />
            <p>Visi Misi</p>
          </Link>
        </div>
        <Link to="/admin/struktur-pemerintahan" className={`menu ${pathname === '/admin/struktur-pemerintahan' ? 'active' : ''}`}>
          <FontAwesomeIcon className="icon" icon={faSitemap} />
          <p>Struktur Pemerintahan</p>
        </Link>
        <Link to="/admin/berita" className={`menu ${pathname === '/admin/berita' ? 'active' : ''}`}>
          <FontAwesomeIcon className="icon" icon={faNewspaper} />
          <p>Berita</p>
        </Link>
        <Link to="/admin/pengumuman" className={`menu ${pathname === '/admin/pengumuman' ? 'active' : ''}`}>
          <FontAwesomeIcon className="icon" icon={faScroll} />
          <p>Pengumuman</p>
        </Link>
        <Link to="/admin/potensi" className={`menu ${pathname === '/admin/potensi' ? 'active' : ''}`}>
          <FontAwesomeIcon className="icon" icon={faStore} />
          <p>Potensi</p>
        </Link>
        <Link to="/admin/admin" className={`menu ${pathname === '/admin/admin' ? 'active' : ''}`}>
          <FontAwesomeIcon className="icon" icon={faUser} />
          <p>Admin</p>
        </Link>
      </ul>
      <div className="logoutSidebar">
        <button onClick={handleLogout}>
          <FontAwesomeIcon className="icon" icon={faRightFromBracket} />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
