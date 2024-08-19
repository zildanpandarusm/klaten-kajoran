import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/adminpages/dashboard';
import LoginPage from './pages/adminpages/loginpage';
import Berita from './pages/adminpages/news';
import AddBerita from './pages/adminpages/addnews';
import EditBerita from './pages/adminpages/editnews';
import Pengumuman from './pages/adminpages/announcement';
import AddPengumuman from './pages/adminpages/addannouncement';
import Potensi from './pages/adminpages/potentials';
import AddPotensi from './pages/adminpages/addpotential';
import EditPotensi from './pages/adminpages/editpotential';
import AddProfil from './pages/adminpages/addprofile';
import Profil from './pages/adminpages/profile';
import EditProfil from './pages/adminpages/editprofile';
import Sejarah from './pages/adminpages/history';
import EditSejarah from './pages/adminpages/editsejarah';
import VisiMisiPage from './pages/adminpages/visimisi';
import EditVisiMisiPage from './pages/adminpages/editvisimisi';
import Organisasi from './pages/adminpages/organization';
import AddOrganisasi from './pages/adminpages/addorganization';
import EditOrganisasi from './pages/adminpages/editorganization';
import HomePage from './pages/userpages/home';
import TentangPage from './pages/userpages/tentang';
import BeritaPage from './pages/userpages/berita';
import DetailBeritaPage from './pages/userpages/detailberita';
import PotensiPage from './pages/userpages/potensi';
import DetailPotensiPage from './pages/userpages/detailpotensi';
import PengumumanPage from './pages/userpages/pengumuman';
import DetailPengumumanPage from './pages/userpages/detailpengumuman';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin/berita" element={<Berita />} />
          <Route path="/admin/berita/add" element={<AddBerita />} />
          <Route path="/admin/berita/edit/:id" element={<EditBerita />} />
          <Route path="/admin/pengumuman" element={<Pengumuman />} />
          <Route path="/admin/pengumuman/add" element={<AddPengumuman />} />
          <Route path="/admin/potensi" element={<Potensi />} />
          <Route path="/admin/potensi/add" element={<AddPotensi />} />
          <Route path="/admin/potensi/edit/:id" element={<EditPotensi />} />
          <Route path="/admin/profil" element={<Profil />} />
          <Route path="/admin/profil/add" element={<AddProfil />} />
          <Route path="/admin/profil/edit/:id" element={<EditProfil />} />
          <Route path="/admin/sejarah" element={<Sejarah />} />
          <Route path="/admin/sejarah/edit/:id" element={<EditSejarah />} />
          <Route path="/admin/visimisi" element={<VisiMisiPage />} />
          <Route path="/admin/visimisi/edit/:id" element={<EditVisiMisiPage />} />
          <Route path="/admin/struktur-pemerintahan" element={<Organisasi />} />
          <Route path="/admin/struktur-pemerintahan/add" element={<AddOrganisasi />} />
          <Route path="/admin/struktur-pemerintahan/edit/:id" element={<EditOrganisasi />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/tentang" element={<TentangPage />} />
          <Route path="/berita" element={<BeritaPage />} />
          <Route path="/berita/:id" element={<DetailBeritaPage />} />
          <Route path="/potensi" element={<PotensiPage />} />
          <Route path="/potensi/:id" element={<DetailPotensiPage />} />
          <Route path="/pengumuman" element={<PengumumanPage />} />
          <Route path="/pengumuman/:id" element={<DetailPengumumanPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
