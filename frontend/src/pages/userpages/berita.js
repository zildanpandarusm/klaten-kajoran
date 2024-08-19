import React from 'react';
import Navbar from '../../components/usercomponents/navbar';
import Berita from '../../components/usercomponents/berita';

const BeritaPage = () => {
  return (
    <div>
      <Navbar page="berita" />
      <Berita />
    </div>
  );
};

export default BeritaPage;
