import React, { useEffect } from 'react';
import Layout from './layout';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserMe } from '../../features/userauth';
import EditHistory from '../../components/admincomponents/edithistory';
import EditVisiMisi from '../../components/admincomponents/editvisimisi';

const EditVisiMisiPage = () => {
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
      <EditVisiMisi />
    </Layout>
  );
};

export default EditVisiMisiPage;
