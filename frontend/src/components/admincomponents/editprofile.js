import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/AdminStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenSquare, faTrashAlt, faCamera, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import config from '../../utils/config';

const EditProfile = () => {
  const [profil, setProfil] = useState([]);
  const [idProfil, setIdProfil] = useState('');
  const [email, setEmail] = useState('');
  const [telp, setTelp] = useState('');
  const [alamat, setAlamat] = useState('');
  const [jmlpdk, setJmlPdk] = useState('');
  const [aktif, setAktif] = useState(false);
  const [hapus, setHapus] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const getProfileById = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/about/${params.id}`);
      setEmail(response.data.data.email);
      setTelp(response.data.data.telp);
      setAlamat(response.data.data.alamat);
      setJmlPdk(response.data.data.jmlpdk);
      setIdProfil(response.data.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const listProfile = () => {
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

      await axios.patch(`${config.BASE_URL}/about/${params.id}`, data, {
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

  useEffect(() => {
    getProfileById();
  }, []);

  return (
    <div>
      <div className="judul">
        <h1>Edit Berita</h1>
        <p>Atur ketersediaan beritamu!</p>
      </div>
      <div className="konten">
        <form onSubmit={handleForm}>
          <div className="formInput">
            <label htmlFor="email">
              Email <span className="wajib">*</span>
            </label>
            <input type="text" id="email" placeholder="Masukkan email" onChange={(e) => setEmail(e.target.value)} value={email} required />
          </div>
          <div className="formInput">
            <label htmlFor="telp">
              Telepon <span className="wajib">*</span>
            </label>
            <input type="text" id="telp" placeholder="Masukkan telepon" onChange={(e) => setTelp(e.target.value)} value={telp} required />
          </div>
          <div className="formInput">
            <label htmlFor="alamat">
              Alamat <span className="wajib">*</span>
            </label>
            <input type="text" id="alamat" placeholder="Masukkan alamat" onChange={(e) => setAlamat(e.target.value)} value={alamat} required />
          </div>
          <div className="formInput">
            <label htmlFor="jmlpdk">
              Jumlah Penduduk <span className="wajib">*</span>
            </label>
            <input type="text" id="jmlpdk" placeholder="Masukkan jumlah penduduk" onChange={(e) => setJmlPdk(e.target.value)} value={jmlpdk} required />
          </div>
          <div className="formButton">
            <button type="submit">Update</button>
            <button type="button" onClick={() => listProfile()}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
