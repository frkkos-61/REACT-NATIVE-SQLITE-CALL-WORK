import {configureStore} from '@reduxjs/toolkit';
import contactReducer from './slice/contactSlice';

const store = configureStore({
  reducer: {
    contacts: contactReducer,
  },
});

export default store;
