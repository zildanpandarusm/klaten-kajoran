import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminStyle.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons';
import 'react-quill/dist/quill.snow.css';
import config from '../../utils/config';

const Profile = () => {
  const [profil, setProfil] = useState(0);
  const [idProfil, setIdProfil] = useState('');
  const [email, setEmail] = useState('');
  const [telp, setTelp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [jmlpdk, setJmlPdk] = useState('');
  const [aktif, setAktif] = useState(false);
  const [hapus, setHapus] = useState(false);
  const navigate = useNavigate();

  const addProfil = () => {
    navigate(`/admin/profil/add`);
  };

  const editProfil = () => {
    navigate(`/admin/profil/edit/${idProfil}`);
  };

  const getAbout = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/about`);
      setEmail(response.data.data[0].email);
      setTelp(response.data.data[0].telp);
      setAlamat(response.data.data[0].alamat);
      setJmlPdk(response.data.data[0].jmlpdk);
      setIdProfil(response.data.data[0]._id);
      setProfil(response.data.data.length);

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
      <div className="judul">
        <h1>Profil Desa</h1>
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
            <label htmlFor="email">Email</label>
            <div className="readOnlyInput">{email}</div>
          </div>
          <div className="formInput">
            <label htmlFor="telp">Telepon</label>
            <div className="readOnlyInput">{telp}</div>
          </div>
          <div className="formInput">
            <label htmlFor="alamat">Alamat</label>
            <div className="readOnlyInput">{alamat}</div>
          </div>
          <div className="formInput">
            <label htmlFor="jmlpdk">Jumlah Penduduk</label>
            <div className="readOnlyInput">{jmlpdk}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
