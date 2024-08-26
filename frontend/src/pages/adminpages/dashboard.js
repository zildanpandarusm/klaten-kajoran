import React, { useEffect } from 'react';
import Layout from './layout';
import HalamanUtama from '../../components/admincomponents/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserMe } from '../../features/userauth';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.userAuth);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
    }
  }, [dispatch, isError, navigate]);

  return (
    <Layout>
      <HalamanUtama />
    </Layout>
  );
};

export default Dashboard;
