import { apiSlice } from './apiSlice';

// L'URL de base pour les appels d'API liés aux recettes
const RECIPES_URL = '/api/recipes';

export const recipeApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addRecipe: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}/createRecipe`,
        method: 'POST',
        body: data,
      }),
    }),
    updateRecipe: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}/updateRecipe/:id`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteRecipe: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}/deleteRecipe/:id`,
        method: 'DELETE',
        body: data,
      }),
    }),
    savedRecipe: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}/addRecipeFavorite/:id`,
        method: 'POST',
        body: data,
      }),
    }),
    unsavedRecipe: builder.mutation({
      query: (data) => ({
        url: `${RECIPES_URL}/removeRecipeFavorite/:id`,
        method: 'DELETE',
        body: data,
      }),
    }),
  }),
});

export const {
  useAddRecipeMutation,
  useUpdateRecipeMutation,
  useDeleteRecipeMutation,
  useSavedRecipeMutation,
  useUnsavedRecipeMutation,
} = recipeApiSlice;
