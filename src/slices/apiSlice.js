// Simplifier la gestion des requêtes réseau dans Redux.
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

//configuration d'une requête de base pour les appels d'API
const baseQuery = fetchBaseQuery({ baseUrl: '' });

//création d'API qui est un objet de configuration avec plusieurs propriétés.
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User','recipe'], 
  endpoints: (builder) => ({
   
  }),
});

/*
Ces tags peuvent être utilisés pour organiser et regrouper vos endpoints d'API 
en fonction de leur fonctionnalité ou de leur domaine
 tagTypes: ['User', 'Recipe'], 
*/