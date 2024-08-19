import React, { useEffect } from 'react';
import Layout from './layout';
import EditNews from '../../components/admincomponents/editnews';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserMe } from '../../features/userauth';
import EditOrganization from '../../components/admincomponents/editorganization';

const EditOrganisasi = () => {
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
      <EditOrganization />
    </Layout>
  );
};

export default EditOrganisasi;
