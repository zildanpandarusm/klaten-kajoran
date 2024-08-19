import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../css/AdminStyle.css';
import { LoginUser, reset } from '../../features/userauth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.userAuth);

  useEffect(() => {
    if (user || isSuccess) {
      navigate('/admin');
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const UserAuth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };

  return (
    <div className="login">
      <div className="box">
        <h1>LOGIN</h1>
        <form onSubmit={UserAuth}>
          <div className="formInput">
            <label for="email">Email</label>
            <input type="email" placeholder="Masukkan email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="formInput">
            <label for="password">Password</label>
            <input type="password" placeholder="Masukkan password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="formInput">{isLoading ? <button disabled>Loading...</button> : <button type="submit">Login</button>}</div>
          {isError && <h3 className="msg">{message}</h3>}
        </form>
      </div>
    </div>
  );
};

export default Login;
