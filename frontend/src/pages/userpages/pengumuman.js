import React from 'react';
import Navbar from '../../components/usercomponents/navbar';
import Pengumuman from '../../components/usercomponents/pengumuman';

const PengumumanPage = () => {
  return (
    <div>
      <Navbar page="pengumuman" />
      <Pengumuman />
    </div>
  );
};

export default PengumumanPage;
