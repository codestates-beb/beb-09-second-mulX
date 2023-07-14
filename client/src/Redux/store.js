import { configureStore } from '@reduxjs/toolkit';
import reducer from './userSlice';

const store = configureStore({
  reducer: reducer
});

export default store;
