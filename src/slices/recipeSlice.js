
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

    // Définir les infos de la recette + mise à jour et stock dans le local storage
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

