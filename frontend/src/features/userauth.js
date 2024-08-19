import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../utils/config';

const initialState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

export const LoginUser = createAsyncThunk('user/LoginUser', async (user, thunkAPI) => {
  try {
    const response = await axios.post(`${config.BASE_URL}/users/login`, {
      email: user.email,
      password: user.password,
    });

    const token = response.data.token;
    sessionStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    const message = error.response.data.msg;
    return thunkAPI.rejectWithValue(message);
  }
});

export const UserMe = createAsyncThunk('user/Me', async (_, thunkAPI) => {
  try {
    const token = sessionStorage.getItem('token');

    const response = await axios.get(`${config.BASE_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.msg;
      return thunkAPI.rejectWithValue(message);
    }
  }
});

export const UserLogout = createAsyncThunk('user/Logout', async () => {
  await axios.delete(`${config.BASE_URL}/users/logout`);
  sessionStorage.removeItem('token');
});

export const authSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(LoginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(LoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(LoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });

    // Get User Login
    builder.addCase(UserMe.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UserMe.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.user = action.payload;
    });
    builder.addCase(UserMe.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.message = action.payload;
    });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
