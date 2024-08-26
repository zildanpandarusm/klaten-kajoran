import React, { useEffect } from 'react';
import Layout from './layout';
import AddAnnouncement from '../../components/admincomponents/addannouncement';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserMe } from '../../features/userauth';

const AddPengumuman = () => {
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
      <AddAnnouncement />
    </Layout>
  );
};

export default AddPengumuman;
