import React from 'react';
import Sidebar from '../../components/admincomponents/adminsidebar';
import Header from '../../components/admincomponents/header';

const Layout = ({ children }) => {
  return (
    <div>
      <Sidebar />
      <Header />
      <main className="layoutKonten">{children}</main>
    </div>
  );
};

export default Layout;
