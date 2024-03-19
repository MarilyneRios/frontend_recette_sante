
// infos sur une recette
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  recipeInfo: {
    name: '',
    category: '',
    ingredients: [],
    instructions: '',
    makingTime: 0,
    cookingTime: 0,
    comments: '',
    pseudo: '',
    imageUrl: '',
    userId: '',
  },
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

