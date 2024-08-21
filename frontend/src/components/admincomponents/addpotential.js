import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminStyle.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPenSquare, faTrashAlt, faCamera, faFileLines } from '@fortawesome/free-solid-svg-icons';
import { useTable, usePagination, useSortBy, useGlobalFilter } from 'react-table';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import config from '../../utils/config';

const AddPotential = () => {
  const [berita, setBerita] = useState([]);
  const [idBerita, setIdBerita] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [category, setCategory] = useState('');
  const [descSingkat, setDescSingkat] = useState('');
  const [phone, setPhone] = useState('');
  const [maps, setMaps] = useState('');
  const [aktif, setAktif] = useState(false);
  const [hapus, setHapus] = useState(false);
  const [file, setFile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetVariable = () => {
    setTitle('');
    setDesc('');
  };

  const listPotential = () => {
    navigate(`/admin/potensi`);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('desc', desc);
      formData.append('descSingkat', descSingkat);
      formData.append('maps', maps);
      formData.append('phone', phone);
      formData.append('file', file);
      formData.append('category', category);
      await axios.post(`${config.BASE_URL}/potentials`, formData);
      setAktif(false);
      resetVariable();
      navigate(`/admin/potensi`);
    } catch (error) {
      // setMsg(error.response.data.msg);
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  return (
    <div>
      <div className="judul">
        <h1>Tambah Potensi</h1>
        <p>Atur ketersediaan potensimu!</p>
      </div>
      <div className="konten">
        {isLoading ? (
          <div className="loading">Loading...</div> // Tanda loading
        ) : (
          <form onSubmit={handleForm}>
            <div className="formInput">
              <label htmlFor="title">
                Judul <span className="wajib">*</span>
              </label>
              <input type="text" id="title" placeholder="Masukkan judul" onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="phone">
                Telepon <span className="wajib">*</span>
              </label>
              <input type="text" id="phone" placeholder="Masukkan telepon" onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="maps">
                Peta <span className="wajib">*</span>
              </label>
              <input type="text" id="maps" placeholder="Masukkan peta" onChange={(e) => setMaps(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="kategori">
                Kategori <span className="wajib">*</span>
              </label>
              <select id="kategori" onChange={(e) => setCategory(e.target.value)}>
                <option>Pilih Kategori</option>
                <option value="umkm">UMKM</option>
                <option value="bumdes">Bumdes</option>
                <option value="wisata">Wisata</option>
              </select>
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
              <ReactQuill className="deskBox" theme="snow" onChange={setDesc} />
            </div>
            <div className="formInput">
              <label htmlFor="descSingkat">
                Deskripsi Singkat <span className="wajib">*</span>
              </label>
              <ReactQuill className="deskBox" theme="snow" onChange={setDescSingkat} />
            </div>
            <div className="formButton">
              <button type="submit">Tambah</button>
              <button type="button" onClick={() => listPotential()}>
                Batal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddPotential;
