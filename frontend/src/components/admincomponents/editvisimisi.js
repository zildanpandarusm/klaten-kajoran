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

const EditVisiMisi = () => {
  const [profil, setProfil] = useState([]);
  const [idProfil, setIdProfil] = useState('');
  const [visi, setVisi] = useState('');
  const [misi, setMisi] = useState('');
  const [aktif, setAktif] = useState(false);
  const [hapus, setHapus] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const getVisiMisiById = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/about/${params.id}`);
      setVisi(response.data.data.visi);
      setMisi(response.data.data.misi);
      setIdProfil(response.data.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  const listVisiMisi = () => {
    navigate(`/admin/visimisi`);
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const data = {
        visi,
        misi,
      };

      await axios.patch(`${config.BASE_URL}/about/${params.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setAktif(false);
      navigate(`/admin/visimisi`);
    } catch (error) {
      // setMsg(error.response.data.msg);
    }
  };

  useEffect(() => {
    getVisiMisiById();
  }, []);

  return (
    <div>
      <div className="judul">
        <h1>Edit Visi & Misi</h1>
        <p>Atur ketersediaan beritamu!</p>
      </div>
      <div className="konten">
        <form onSubmit={handleForm}>
          <div className="formInput">
            <label htmlFor="visi">
              Visi <span className="wajib">*</span>
            </label>
            <ReactQuill className="deskBox" theme="snow" onChange={setVisi} value={visi} required />
          </div>
          <div className="formInput">
            <label htmlFor="misi">
              Misi <span className="wajib">*</span>
            </label>
            <ReactQuill className="deskBox" theme="snow" onChange={setMisi} value={misi} required />
          </div>
          <div className="formButton">
            <button type="submit">Update</button>
            <button type="button" onClick={() => listVisiMisi()}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVisiMisi;
