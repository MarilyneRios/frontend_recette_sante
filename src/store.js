import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
//import { apiSlice } from './slices/apiSlice';

// création du store Redux
const store = configureStore({
 
    reducer: {  
        auth: authReducer,
    },
      
    /* reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, // gère l’état lié aux API
    auth: authReducer,
  },*/

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(), //.concat(apiSlice.middleware), 
    devTools: true, 
});

export default store;