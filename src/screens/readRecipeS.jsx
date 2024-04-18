import { useState, useEffect  } from "react";
import { useSelector } from "react-redux";
import { Container, Row } from "react-bootstrap";
import { useCategory } from "../contexts/CategoryContext";
import { useAllRecipesAuthQuery, useSearchRecipeQuery} from "../slices/recipesApiSlice";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import RecipeCard from "../components/RecipeCard";
import { useSearchContext } from "../contexts/SearchContext";


function ReadRecipeS({ recipes, currentPage }) {
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  const { isError, isLoading, isSuccess } = useAllRecipesAuthQuery();
  console.log(recipes);
  //Filtre par category
  const { selectedCategory } = useCategory();
  //SearchBar
  const { searchQuery, submittedSearchQuery  } = useSearchContext();
  
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    if (isSuccess && recipes) {
        let filtered = recipes;
        if (selectedCategory) {
            filtered = filtered.filter(recipe => recipe.category === selectedCategory);
        }
        if (submittedSearchQuery) {
          const searchRegex = new RegExp(submittedSearchQuery, 'i');
          filtered = filtered.filter(recipe => 
            searchRegex.test(recipe.name) ||
            searchRegex.test(recipe.pseudo) ||
            searchRegex.test(recipe.comments) ||
            searchRegex.test(recipe.category)
          );
      }
      setFilteredRecipes(filtered);
  }
}, [selectedCategory, submittedSearchQuery, isSuccess, recipes]);

  const recipesPerPage = 6;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  return (
    <>
      {isLoading && <Loader />}
      {isError && <h3>Quelque chose ne va pas ...</h3>}
      {isSuccess && (
        <Container className="w-75">
          <SearchBar searchQuery={searchQuery} />
          <Row>
            {currentRecipes &&
              currentRecipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} index={index} />
              ))}
          </Row>
        </Container>
      )}
    </>
  );
}

export default ReadRecipeS;
