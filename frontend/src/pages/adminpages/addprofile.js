import React, { useEffect } from 'react';
import Layout from './layout';
import News from '../../components/admincomponents/news';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserMe } from '../../features/userauth';
import AddProfile from '../../components/admincomponents/addprofile';

const AddProfil = () => {
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
      <AddProfile />
    </Layout>
  );
};

export default AddProfil;
