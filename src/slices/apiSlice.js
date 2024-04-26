// Simplifier la gestion des requêtes réseau dans Redux.
import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

//configuration d'une requête de base pour les appels d'API
const baseQuery = fetchBaseQuery({ baseUrl: 'https://backend-recette-sante.vercel.app' });

//création d'API qui est un objet de configuration avec plusieurs propriétés.
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User','Recipes'], 
  endpoints: (builder) => ({
   
  }),
});

/*
Ces tags peuvent être utilisés pour organiser et regrouper vos endpoints d'API 
en fonction de leur fonctionnalité ou de leur domaine
 tagTypes: ['User', 'Recipe'], 
 frontend User == backend User model export
*/