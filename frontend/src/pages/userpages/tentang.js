import React from 'react';
import Navbar from '../../components/usercomponents/navbar';
import Tentang from '../../components/usercomponents/tentang';

const TentangPage = () => {
  return (
    <div>
      <Navbar page="tentang" />
      <Tentang />
    </div>
  );
};

export default TentangPage;
