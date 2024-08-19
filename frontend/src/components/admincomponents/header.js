import React from 'react';
import '../css/AdminStyle.css';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = () => {
  return (
    <div className="header">
      <h1>Desa Kajoran & UIN Suka</h1>
      <button>
        <FontAwesomeIcon className="icon" icon={faRightFromBracket} />
      </button>
    </div>
  );
};

export default Header;
