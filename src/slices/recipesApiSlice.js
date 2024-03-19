import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const recipesApiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/recipes' }),
  
  endpoints: (builder) => ({
    addRecipe: builder.mutation({
      query: (data) => ({
        url: `/createRecipe`,
        method: 'POST',
        body: data,
      }),
    }),
    updateRecipe: builder.mutation({
      query: ({id, ...data}) => ({
        url: `/updateRecipe/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),
    deleteRecipe: builder.mutation({
      query: (id) => ({
        url: `/deleteRecipe/${id}`,
        method: 'DELETE',
        body: id,
      }),
    }),


    savedRecipe: builder.mutation({
      query: (id) => ({
        url: `/addRecipeFavorite/${id}`,
        method: 'POST',
      }),
    }),
    unsavedRecipe: builder.mutation({
      query: (id) => ({
        url: `/removeRecipeFavorite/${id}`,
        method: 'DELETE',
      }),
    }),


    allRecipesAuth: builder.query({
      query: () => ({
        url: `/allRecipesAuth`,
        method: 'GET',
        transformResponse: res => res.sort((a, b) => b.id - a.id),
        providesTags: ['recipes'],
      }),
    }),
    oneRecipeAuth: builder.query({
      query: (id) => ({
        url: `/oneRecipeAuth/${id}`,
        method: 'GET',
      }),
    }),


    searchRecipe: builder.query({
      query: (query) => ({
        url: `/searchRecipe/${query}`,
        method: 'GET',
      }),
    }),
    filterRecipe: builder.query({
      query: (query) => ({
        url: `/filterRecipe/${query}`,
        method: 'GET',
      }),
    }),

    
    allRecipesFavorite: builder.query({
      query: () => ({
        url: `/allRecipesFavorite`,
        method: 'GET',
      }),
    }),
    oneRecipesFavorite: builder.query({
      query: (id) => ({
        url: `/oneRecipesFavorite/${id}`,
        method: 'GET',
      }),
    }),
    addRecipeFavorite: builder.mutation({
      query: (id) => ({
        url: `/addRecipeFavorite/${id}`,
        method: 'POST',
      }),
    }),
    removeRecipeFavorite: builder.mutation({
      query: (id) => ({
        url: `/removeRecipeFavorite/${id}`,
        method: 'DELETE',
        body: id,
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

  useAllRecipesAuthQuery,
  useOneRecipeAuthQuery,
  useSearchRecipeQuery,
  useFilterRecipeQuery,
  useAllRecipesFavoriteQuery,
  useOneRecipesFavoriteQuery,

  useAddRecipeFavoriteMutation,
  useRemoveRecipeFavoriteMutation,
} = recipesApiSlice;
