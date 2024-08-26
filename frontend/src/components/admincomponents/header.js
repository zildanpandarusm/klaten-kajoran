import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserLogout, reset } from '../../features/userauth';
import '../css/AdminStyle.css';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(UserLogout());
    dispatch(reset());
    navigate('/admin/login');
  };
  return (
    <div className="header">
      <h1>Desa Kajoran</h1>
      <button onClick={handleLogout}>
        <FontAwesomeIcon className="icon" icon={faRightFromBracket} />
      </button>
    </div>
  );
};

export default Header;
