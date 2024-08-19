import React from 'react';
import Navbar from '../../components/usercomponents/navbar';
import DetailPengumuman from '../../components/usercomponents/detailpengumuman';

const DetailPengumumanPage = () => {
  return (
    <div>
      <Navbar page="detailpengumuman" />
      <DetailPengumuman />
    </div>
  );
};

export default DetailPengumumanPage;
