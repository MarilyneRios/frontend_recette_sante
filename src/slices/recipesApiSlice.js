import { apiSlice } from './apiSlice';

// l’URL de base pour les appels d’API liés users
const RECIPES_URL = '/api/recipes';

export const recipesApiSlice = apiSlice.injectEndpoints ({
  endpoints: (builder) => ({
    addRecipe: builder.mutation({
      query: (Recipe) => ({
        url: `${RECIPES_URL}/createRecipe`,
        method: 'POST',
        body: Recipe,
      }),
      invalidatesTags:["Recipes"],
    }),
    updateRecipe: builder.mutation({
      query: ({id, ...Recipes}) => ({
        url: `${RECIPES_URL}/updateRecipe/${id}`,
        method: 'PUT',
        body: Recipes,
      }),
    }),
    deleteRecipe: builder.mutation({
      query: (id) => ({
        url: `${RECIPES_URL}/deleteRecipe/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags:["Recipes"],
    }),

    allRecipesAuth: builder.query({
      query: () => ({
        url: `${RECIPES_URL}/allRecipesAuth`,
        method: 'GET',
        transformResponse: res => res.sort((a, b) => b.id - a.id),
        providesTags: ['Recipes'],
      }),
    }),
    oneRecipeAuth: builder.query({
      query: (id) => ({
        url: `${RECIPES_URL}/oneRecipeAuth/${id}`,
        method: 'GET',
        providesTags: ['Recipes'],
      }),
    }),
    viewRecipeAuth: builder.query({
      query: (id) => ({
        url: `${RECIPES_URL}/viewRecipeAuth/${id}`,
        method: 'GET',
        providesTags: ['Recipes'],
      }),
    }),

    searchRecipe: builder.query({
      query: (query) => ({
        url: `${RECIPES_URL}/searchRecipe/${query}`,
        method: 'GET',
      }),
    }),
    filterRecipe: builder.query({
      query: (category) => ({
        url: `${RECIPES_URL}/filterRecipe/${category}`,
        method: 'GET',
      }),
    }),    
    
    allRecipesFavorite: builder.query({
      query: () => ({
        url: `${RECIPES_URL}/allRecipesFavorite`,
        method: 'GET',
      }),
    }),
    oneRecipesFavorite: builder.query({
      query: (id) => ({
        url: `${RECIPES_URL}/oneRecipesFavorite/${id}`,
        method: 'GET',
      }),
    }),
    addRecipeFavorite: builder.mutation({
      query: (id) => ({
        url: `${RECIPES_URL}/addRecipeFavorite/${id}`,
        method: 'POST',
      }),
    }),
    removeRecipeFavorite: builder.mutation({
      query: (id) => ({
        url: `${RECIPES_URL}/removeRecipeFavorite/${id}`,
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

  useAllRecipesAuthQuery,
  useOneRecipeAuthQuery,
  useViewRecipeAuthQuery,

  useSearchRecipeQuery,
  useFilterRecipeQuery,

  useAllRecipesFavoriteQuery,
  useOneRecipesFavoriteQuery,
  useAddRecipeFavoriteMutation,
  useRemoveRecipeFavoriteMutation,
} = recipesApiSlice;
