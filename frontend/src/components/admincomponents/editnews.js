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

const EditNews = () => {
  const [berita, setBerita] = useState([]);
  const [idBerita, setIdBerita] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [aktif, setAktif] = useState(false);
  const [hapus, setHapus] = useState(false);
  const [file, setFile] = useState('');
  const [descSingkat, setDescSingkat] = useState('');
  const navigate = useNavigate();
  const params = useParams();

  const resetVariable = () => {
    setTitle('');
    setDesc('');
  };

  const getPostsById = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/posts/${params.id}`);
      setTitle(response.data.data.title);
      setDesc(response.data.data.desc);
      setFile(response.data.data.imageUrl);
      setDescSingkat(response.data.data.descSingkat);
      setCategory(response.data.data.category);
      console.log(title);
    } catch (err) {
      console.log(err);
    }
  };

  const listNews = () => {
    navigate(`/admin/berita`);
  };

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('desc', desc);
      formData.append('descSingkat', descSingkat);
      formData.append('file', file);
      formData.append('category', category);
      await axios.patch(`${config.BASE_URL}/posts/${params.id}`, formData);
      setAktif(false);
      navigate(`/admin/berita`);
    } catch (error) {
      // setMsg(error.response.data.msg);
    }
  };

  useEffect(() => {
    getPostsById();
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
            <label htmlFor="title">
              Judul <span className="wajib">*</span>
            </label>
            <input type="text" id="title" placeholder="Masukkan judul" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="formInput">
            <label htmlFor="foto">
              Foto <span className="wajib">*</span>
            </label>
            <input type="file" id="foto" onChange={(e) => setFile(e.target.files[0])} />
          </div>
          <div className="formInput">
            <label htmlFor="desc">
              Deskripsi <span className="wajib">*</span>
            </label>
            <ReactQuill className="deskBox" theme="snow" onChange={setDesc} value={desc} />
          </div>
          <div className="formInput">
            <label htmlFor="descSingkat">
              Deskripsi Singkat <span className="wajib">*</span>
            </label>
            <ReactQuill className="deskBox" theme="snow" onChange={setDescSingkat} value={descSingkat} />
          </div>
          <div className="formInput">
            <label htmlFor="kategori">
              Kategori <span className="wajib">*</span>
            </label>
            <select id="kategori" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Pilih Kategori</option>
              <option value="politik">politik</option>
              <option value="ekonomi">ekonomi</option>
              <option value="sosial">sosial</option>
              <option value="budaya">budaya</option>
              <option value="teknologi">teknologi</option>
              <option value="hiburan">hiburan</option>
              <option value="teknologi">keagamaan</option>
              <option value="teknologi">olahraga</option>
            </select>
          </div>
          <div className="formButton">
            <button type="submit">Update</button>
            <button type="button" onClick={() => listNews()}>
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNews;
