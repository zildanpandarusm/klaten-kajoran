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

const EditHistory = () => {
  const [profil, setProfil] = useState([]);
  const [idProfil, setIdProfil] = useState('');
  const [sejarah, setSejarah] = useState('');
  const [aktif, setAktif] = useState(false);
  const [hapus, setHapus] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const getHistoryById = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/about/${params.id}`);
      setSejarah(response.data.data.sejarah);
      setIdProfil(response.data.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const listHistory = () => {
    navigate(`/admin/sejarah`);
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const data = {
        sejarah,
      };

      await axios.patch(`${config.BASE_URL}/about/${params.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setAktif(false);
      navigate(`/admin/sejarah`);
    } catch (error) {
      // setMsg(error.response.data.msg);
    }
  };

  useEffect(() => {
    getHistoryById();
  }, []);

  return (
    <div>
      <div className="judul">
        <h1>Edit Sejarah</h1>
        <p>Atur ketersediaan beritamu!</p>
      </div>
      <div className="konten">
        <form onSubmit={handleForm}>
          <div className="formInput">
            <label htmlFor="sejarah">
              Sejarah <span className="wajib">*</span>
            </label>
            <ReactQuill className="deskBox" theme="snow" onChange={setSejarah} value={sejarah} required />
          </div>
          <div className="formButton">
            <button type="submit">Update</button>
            <button type="button" onClick={() => listHistory()}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditHistory;
