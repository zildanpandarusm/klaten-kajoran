import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminStyle.css';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import config from '../../utils/config';

const AddAnnouncement = () => {
  const [pengumuman, setPengumuman] = useState([]);
  const [idPengumuman, setIdPengumuman] = useState('');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [aktif, setAktif] = useState(false);
  const [hapus, setHapus] = useState(false);
  const [file, setFile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetVariable = () => {
    setTitle('');
    setDesc('');
  };

  const listAnnouncement = () => {
    navigate(`/admin/pengumuman`);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('desc', desc);
      formData.append('file', file);
      await axios.post(`${config.BASE_URL}/announcements`, formData);
      setAktif(false);
      resetVariable();
      navigate(`/admin/pengumuman`);
    } catch (error) {
      // setMsg(error.response.data.msg);
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  return (
    <div>
      <div className="judul">
        <h1>Tambah Pengumuman</h1>
        <p>Atur ketersediaan pengumumanmu!</p>
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
              <label htmlFor="file">
                File <span className="wajib">*</span>
              </label>
              <input type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="formInput">
              <label htmlFor="desc">
                Deskripsi <span className="wajib">*</span>
              </label>
              <ReactQuill className="deskBox" theme="snow" onChange={setDesc} />
            </div>
            <div className="formButton">
              <button type="submit">Tambah</button>
              <button type="button" onClick={() => listAnnouncement()}>
                Batal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddAnnouncement;
