import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminStyle.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import 'react-quill/dist/quill.snow.css';
import config from '../../utils/config';

const VisiMisi = () => {
  const [profil, setProfil] = useState(0);
  const [idProfil, setIdProfil] = useState('');
  const [visi, setVisi] = useState('');
  const [misi, setMisi] = useState('');
  const [aktif, setAktif] = useState(false);
  const [hapus, setHapus] = useState(false);
  const navigate = useNavigate();

  const addProfil = () => {
    navigate(`/admin/visimisi/add`);
  };

  const editProfil = () => {
    navigate(`/admin/visimisi/edit/${idProfil}`);
  };

  const getAbout = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/about`);
      setVisi(response.data.data[0].visi);
      setMisi(response.data.data[0].misi);
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
        <h1>Visi & Misi</h1>
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
            <label htmlFor="visi">Visi</label>
            <div className="readOnlyInput">{visi}</div>
          </div>
          <div className="formInput">
            <label htmlFor="misi">Misi</label>
            <div className="readOnlyInput">{misi}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisiMisi;
