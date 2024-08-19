import React from 'react';
import Home from '../../components/usercomponents/home';
import Navbar from '../../components/usercomponents/navbar';

const HomePage = () => {
  return (
    <div>
      <Navbar page="home" />
      <Home />
    </div>
  );
};

export default HomePage;
