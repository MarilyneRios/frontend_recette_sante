
/* eslint-disable react/jsx-key */
import { useSelector } from "react-redux";
import {  Container, Row } from "react-bootstrap";

import { useAllRecipesAuthQuery } from "../slices/recipesApiSlice";

import Loader from "../components/Loader";
import RecipeCard from "../components/RecipeCard";

function ReadRecipeS({ recipes, currentPage }) {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  const { isError, isLoading, isSuccess } = useAllRecipesAuthQuery();
  console.log(recipes);

  // Avoir current recipes
  const recipesPerPage = 6;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <h3>Quelque chose ne va pas ...</h3>}
      {isSuccess && (
        <Container className="w-75">
          <Row>
          {currentRecipes &&
          currentRecipes.map((recipe,index) => <RecipeCard key={index} recipe={recipe} />)}
          </Row>
        </Container>
      )}
    </>
  );
}

export default ReadRecipeS;
