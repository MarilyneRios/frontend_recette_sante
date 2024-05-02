/*
// Simplifier la gestion des requêtes réseau dans Redux.
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

//configuration d'une requête de base pour les appels d'API
const baseQuery = fetchBaseQuery({ baseUrl: 'https://backend-recette-sante.onrender.com' });
//const baseQuery = fetchBaseQuery({ baseUrl: '' });
//création d'API qui est un objet de configuration avec plusieurs propriétés.
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User','Recipes'], 
  endpoints: (builder) => ({
   
  }),
});
*/
// apiSlice.js
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  /*
  baseUrl: 'https://backend-recette-sante.onrender.com',
  prepareHeaders: (headers, { getState }) => {
    // Obtenez le jeton du state Redux
    const token = getState().auth.userInfo.token;

    // Si le jeton est disponible, ajoutez-le à l'en-tête d'autorisation
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },*/
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User','Recipes'], 
  endpoints: (builder) => ({  }),
});
