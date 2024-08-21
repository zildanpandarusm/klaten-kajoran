import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/AdminStyle.css';
import axios from 'axios';
import 'react-quill/dist/quill.snow.css';
import config from '../../utils/config';

const EditOrganization = () => {
  const [berita, setBerita] = useState([]);
  const [idBerita, setIdBerita] = useState('');
  const [nama, setNama] = useState('');
  const [jabatan, setJabatan] = useState('');
  const [aktif, setAktif] = useState(false);
  const [hapus, setHapus] = useState(false);
  const [file, setFile] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const resetVariable = () => {
    setNama('');
    setJabatan('');
  };

  const getOrganizationById = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/organization/${params.id}`);
      setNama(response.data.data.nama);
      setJabatan(response.data.data.jabatan);
      setFile(response.data.data.imageUrl);
      console.log(nama);
    } catch (err) {
      console.log(err);
    }
  };

  const listOrganization = () => {
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
      await axios.patch(`${config.BASE_URL}/organization/${params.id}`, formData);
      setAktif(false);
      resetVariable();
      navigate(`/admin/struktur-pemerintahan`);
    } catch (error) {
      // setMsg(error.response.data.msg);
    } finally {
      setIsLoading(false); 
  };

  useEffect(() => {
    getOrganizationById();
  }, []);

  return (
    <div>
      <div className="judul">
        <h1>Edit Struktur Pemerintahan</h1>
        <p>Atur ketersediaan struktur pemerintahanmu!</p>
      </div>
      <div className="konten">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <form onSubmit={handleForm}>
            <div className="formInput">
              <label htmlFor="nama">
                Judul <span className="wajib">*</span>
              </label>
              <input type="text" id="nama" placeholder="Masukkan judul" value={nama} onChange={(e) => setNama(e.target.value)} required />
            </div>
            <div className="formInput">
              <label htmlFor="jabatan">
                Deskripsi <span className="wajib">*</span>
              </label>
              <input type="text" id="jabatan" placeholder="Masukkan jabatan" onChange={(e) => setJabatan(e.target.value)} value={jabatan} required />
            </div>
            <div className="formInput">
              <label htmlFor="foto">
                Foto <span className="wajib">*</span>
              </label>
              <input type="file" id="foto" onChange={(e) => setFile(e.target.files[0])} />
            </div>

            <div className="formButton">
              <button type="submit">Update</button>
              <button type="button" onClick={() => listOrganization()}>
                Batal
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditOrganization;
