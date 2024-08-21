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

const EditPotentials = () => {
  const [berita, setBerita] = useState([]);
  const [idBerita, setIdBerita] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [descSingkat, setDescSingkat] = useState('');
  const [category, setCategory] = useState('');
  const [phone, setPhone] = useState('');
  const [maps, setMaps] = useState('');
  const [aktif, setAktif] = useState(false);
  const [hapus, setHapus] = useState(false);
  const [file, setFile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const resetVariable = () => {
    setTitle('');
    setDesc('');
  };

  const getPotentionalsById = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/potentials/${params.id}`);
      setTitle(response.data.data.title);
      setDesc(response.data.data.desc);
      setFile(response.data.data.imageUrl);
      setCategory(response.data.data.category);
      setPhone(response.data.data.phone);
      setMaps(response.data.data.maps);
      setDescSingkat(response.data.data.descSingkat);
      console.log(title);
    } catch (err) {
      console.log(err);
    }
  };

  const listPotentials = () => {
    navigate(`/admin/potensi`);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('desc', desc);
      formData.append('maps', maps);
      formData.append('phone', phone);
      formData.append('file', file);
      formData.append('descSingkat', descSingkat);
      formData.append('category', category);
      await axios.patch(`${config.BASE_URL}/potentials/${params.id}`, formData);
      setAktif(false);
      resetVariable();
      navigate(`/admin/potensi`);
    } catch (error) {
      // setMsg(error.response.data.msg);
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  useEffect(() => {
    getPotentionalsById();
  }, []);

  return (
    <div>
      <div className="judul">
        <h1>Edit Berita</h1>
        <p>Atur ketersediaan beritamu!</p>
      </div>
      <div className="konten">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <form onSubmit={handleForm}>
            <div className="formInput">
              <label htmlFor="title">
                Judul <span className="wajib">*</span>
              </label>
              <input type="text" id="title" placeholder="Masukkan judul" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="phone">
                Telepon <span className="wajib">*</span>
              </label>
              <input type="text" id="phone" placeholder="Masukkan telepon" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="maps">
                Peta <span className="wajib">*</span>
              </label>
              <input type="text" id="maps" placeholder="Masukkan peta" value={maps} onChange={(e) => setMaps(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="kategori">
                Kategori <span className="wajib">*</span>
              </label>
              <select id="kategori" value={category} onChange={(e) => setCategory(e.target.value)}>
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
              <ReactQuill className="deskBox" theme="snow" onChange={setDesc} value={desc} />
            </div>
            <div className="formInput">
              <label htmlFor="descSingkat">
                Deskripsi Singkat <span className="wajib">*</span>
              </label>
              <ReactQuill className="deskBox" theme="snow" onChange={setDescSingkat} value={descSingkat} />
            </div>
            <div className="formButton">
              <button type="submit">Update</button>
              <button type="button" onClick={() => listPotentials()}>
                Batal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditPotentials;
