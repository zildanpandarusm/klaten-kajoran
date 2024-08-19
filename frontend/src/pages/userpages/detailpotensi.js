import React from 'react';
import Navbar from '../../components/usercomponents/navbar';
import DetailPotensi from '../../components/usercomponents/detailpotensi';

const DetailPotensiPage = () => {
  return (
    <div>
      <Navbar page="detailpotensi" />
      <DetailPotensi />
    </div>
  );
};

export default DetailPotensiPage;
