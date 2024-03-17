/*
 import { apiSlice } from './apiSlice';

 // l’URL de base pour les appels d’API liés users
const RECIPES_URL = '/api/recipes';

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        addRecipe:  builder.mutation({
            query: (data) => ({
                url: `${RECIPES_URL}`,
                method: 'POST',
                body: data,
            }),
        }), 
        updateRecipe:  builder.mutation({
            query: (data) => ({
                url: `${RECIPES_URL}`,
                method: 'PUT',
                body: data,
            }), 
        }),    
         deleteRecipe:  builder.mutation({
            query: (data) => ({
                url: `${RECIPES_URL}`,
                method: 'DELETE',
                body: data,
            }),   
        }),    
         savedRecipe : builder.mutation({
            query: (data) => ({
                url: `${RECIPES_URL}`,
                method: 'POST',
                body: data,
            }),
        }),    
         unsavedRecipe  builder.mutation({
            query: (data) => ({
                url: `${RECIPES_URL}`,
                method: 'DELETE',
                body: data,
            }),    
        }),           
    })

})
 
export const {
useAddRecipeMutation
} = recipeApiSlice;
*/