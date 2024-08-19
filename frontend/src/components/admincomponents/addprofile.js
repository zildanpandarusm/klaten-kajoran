import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminStyle.css';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import config from '../../utils/config';

const AddProfile = () => {
  const [profil, setProfil] = useState([]);
  const [idProfil, setIdProfil] = useState('');
  const [email, setEmail] = useState('');
  const [telp, setTelp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [jmlpdk, setJmlPdk] = useState('');
  const [aktif, setAktif] = useState(false);
  const [hapus, setHapus] = useState(false);
  const navigate = useNavigate();

  const listNews = () => {
    navigate(`/admin/profil`);
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const data = {
        email,
        telp,
        alamat,
        jmlpdk,
      };

      await axios.post(`${config.BASE_URL}/about`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setAktif(false);
      navigate(`/admin/profil`);
    } catch (error) {
      // setMsg(error.response.data.msg);
    }
  };

  return (
    <div>
      <div className="judul">
        <h1>Tambah Profil</h1>
        <p>Atur ketersediaan beritamu!</p>
      </div>
      <div className="konten">
        <form onSubmit={handleForm}>
          <div className="formInput">
            <label htmlFor="email">
              Email <span className="wajib">*</span>
            </label>
            <input type="text" id="email" placeholder="Masukkan email" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="formInput">
            <label htmlFor="telp">
              Telepon <span className="wajib">*</span>
            </label>
            <input type="text" id="telp" placeholder="Masukkan telepon" onChange={(e) => setTelp(e.target.value)} required />
          </div>
          <div className="formInput">
            <label htmlFor="alamat">
              Alamat <span className="wajib">*</span>
            </label>
            <input type="text" id="alamat" placeholder="Masukkan alamat" onChange={(e) => setAlamat(e.target.value)} required />
          </div>
          <div className="formInput">
            <label htmlFor="jmlpdk">
              Jumlah Penduduk <span className="wajib">*</span>
            </label>
            <input type="text" id="jmlpdk" placeholder="Masukkan jumlah penduduk" onChange={(e) => setJmlPdk(e.target.value)} required />
          </div>
          <div className="formButton">
            <button type="submit">Tambah</button>
            <button type="button" onClick={() => listNews()}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProfile;
