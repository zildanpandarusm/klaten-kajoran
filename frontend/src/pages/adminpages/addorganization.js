import React, { useEffect } from 'react';
import Layout from './layout';
import AddNews from '../../components/admincomponents/addnews';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserMe } from '../../features/userauth';
import AddOrganization from '../../components/admincomponents/addorganization';

const AddOrganisasi = () => {
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
      <AddOrganization />
    </Layout>
  );
};

export default AddOrganisasi;
