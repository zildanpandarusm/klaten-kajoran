import { configureStore } from '@reduxjs/toolkit';
import userAuthReducer from '../features/userauth';

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
  },
});
