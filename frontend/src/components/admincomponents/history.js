import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminStyle.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import 'react-quill/dist/quill.snow.css';
import config from '../../utils/config';

const History = () => {
  const [profil, setProfil] = useState(0);
  const [idProfil, setIdProfil] = useState('');
  const [sejarah, setSejarah] = useState('');
  const [aktif, setAktif] = useState(false);
  const [hapus, setHapus] = useState(false);
  const navigate = useNavigate();

  const addProfil = () => {
    navigate(`/admin/sejarah/add`);
  };

  const editProfil = () => {
    navigate(`/admin/sejarah/edit/${idProfil}`);
  };

  const getAbout = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/about`);
      setSejarah(response.data.data[0].sejarah);
      setIdProfil(response.data.data[0]._id);
      setProfil(response.data.data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAbout();
  }, []);

  return (
    <div>
      <div className="judul">
        <h1>Sejarah</h1>
        <p>Atur profil desamu!</p>
      </div>
      <div className="konten">
        <div className="tambah">
          <div className="table-controls"></div>
          {profil >= 1 ? (
            <button onClick={() => editProfil()}>
              <FontAwesomeIcon className="icon" icon={faEdit} />
              Edit
            </button>
          ) : (
            <button onClick={() => addProfil()}>
              <FontAwesomeIcon className="icon" icon={faPlus} />
              Tambah
            </button>
          )}
        </div>

        <form>
          <div className="formInput">
            <label htmlFor="sejarah">Sejarah</label>
            <div className="readOnlyInput">{sejarah}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default History;
