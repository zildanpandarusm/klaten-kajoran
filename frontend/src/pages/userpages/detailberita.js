import React from 'react';
import Navbar from '../../components/usercomponents/navbar';
import DetailBerita from '../../components/usercomponents/detailberita';

const DetailBeritaPage = () => {
  return (
    <div>
      <Navbar page="detailberita" />
      <DetailBerita />
    </div>
  );
};

export default DetailBeritaPage;
