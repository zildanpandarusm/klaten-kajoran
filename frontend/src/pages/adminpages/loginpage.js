import React, { useEffect } from 'react';

import Login from '../../components/admincomponents/login';

import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      navigate('/admin');
    }
  }, [navigate]);

  return <Login />;
};

export default LoginPage;
