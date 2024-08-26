import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AdminStyle.css';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import config from '../../utils/config';

const AddOrganization = () => {
  const [organization, setOrganization] = useState([]);
  const [idOrganization, setIdOrganization] = useState('');
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [aktif, setAktif] = useState(false);
  const [hapus, setHapus] = useState(false);
  const [file, setFile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const resetVariable = () => {
    setNama('');
    setJabatan('');
  };

  const listNews = () => {
    navigate(`/admin/struktur-pemerintahan`);
  };

  const handleForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('nama', nama);
      formData.append('jabatan', jabatan);
      formData.append('file', file);
      await axios.post(`${config.BASE_URL}/organization`, formData);
      setAktif(false);
      resetVariable();
      navigate(`/admin/struktur-pemerintahan`);
    } catch (error) {
      // setMsg(error.response.data.msg);
    } finally {
      setIsLoading(false); // Selesai loading
    }
  };

  return (
    <div>
      <div className="judul">
        <h1>Tambah Struktur Pemerintahan</h1>
        <p>Atur ketersediaan struktur pemerintahanmu!</p>
      </div>
      <div className="konten">
        {isLoading ? (
          <div className="loading">Loading...</div> // Tanda loading
        ) : (
          <form onSubmit={handleForm}>
            <div className="formInput">
              <label htmlFor="nama">
                Nama <span className="wajib">*</span>
              </label>
              <input type="text" id="nama" placeholder="Masukkan nama" onChange={(e) => setNama(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="jabatan">
                Jabatan <span className="wajib">*</span>
              </label>
              <input type="text" id="jabatan" placeholder="Masukkan jabatan" onChange={(e) => setJabatan(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="foto">
                Foto (PNG, JPG) <span className="wajib">*</span>
              </label>
              <input type="file" id="foto" onChange={(e) => setFile(e.target.files[0])} />
            </div>
            <div className="formButton">
              <button type="submit">Tambah</button>
              <button type="button" onClick={() => listNews()}>
                Batal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AddOrganization;
