import React, { useEffect } from 'react';
import Layout from './layout';
import Announcement from '../../components/admincomponents/announcement';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserMe } from '../../features/userauth';

const Pengumuman = () => {
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
      <Announcement />
    </Layout>
  );
};

export default Pengumuman;
