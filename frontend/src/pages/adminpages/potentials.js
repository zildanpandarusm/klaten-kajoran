import React, { useEffect } from 'react';
import Layout from './layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserMe } from '../../features/userauth';
import Potentials from '../../components/admincomponents/potentials';

const Potensi = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError } = useSelector((state) => state.userAuth);

  useEffect(() => {
    dispatch(UserMe());
    if (isError) {
      navigate('/admin/login');
    }
  }, [dispatch, isError, navigate]);

  return (
    <Layout>
      <Potentials />
    </Layout>
  );
};

export default Potensi;
