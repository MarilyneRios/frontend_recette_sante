/*
// infos sur une recette
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipeInfo: localStorage.getItem('recipeInfo')
    ? JSON.parse(localStorage.getItem('recipeInfo'))
    : null
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {

    // Définir les informations de la recette
    setRecipe: (state, action) => {
      state.recipeInfo = action.payload;
      localStorage.setItem('recipeInfo', JSON.stringify(action.payload));
    },

    // Réinitialiser RecipeInfo
    resetRecipeInfo: (state) => {
      state.recipeInfo = null;
      localStorage.removeItem('recipeInfo');
    },
  },
});

export const { setRecipe, resetRecipeInfo } = recipeSlice.actions;

export default recipeSlice.reducer;

*/