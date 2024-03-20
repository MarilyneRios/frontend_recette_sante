import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormContainerRecipe from "../components/FormContainerRecipe";
import { Card, Button } from "react-bootstrap";
import bookImage from "../assets/book.png";
import { useOneRecipeAuthQuery } from "../slices/recipesApiSlice";
import { FaHeart } from "react-icons/fa";
import Loader from "../components/Loader";
import { useParams, useLocation, Link } from "react-router-dom";

function ReadRecipe() {
  
  const { userInfo } = useSelector((state) => state.auth);
 
  // Récupérer l'identifiant de la recette 
  const {id} = useParams();

  const [liked, setLiked] = useState(false);
  const[recipe, setRecipe] = useState(null);
  const { recipeInfo } = useSelector((state) => state.recipe);
  const recipeId = recipeInfo ? recipeInfo.id : null;


 const { data: currentRecipe, isError, isLoading } = useOneRecipeAuthQuery(recipeId || id);
  
  //console.log(`current recipe ${currentRecipe}`);
/*

    //Récup une recette du back
    useEffect(() => {
      if ( currentRecipe && currentRecipe.id) {
        setRecipe(currentRecipe);
      } else {
        console.error('Current recipe data is not available or not structured as expected');
      }
    }, [ currentRecipe]);*/

    //like btn logique
    const toggleLike = () => {
      setLiked(!liked);
    };
/**
   {isLoading && <Loader />}
   {isError && <h3>Something is wrong ...</h3>}
     {recipe &&   }
      src={'recipe.imageUrl' || bookImage}
 */
    return (
      <>
      
      
          <FormContainerRecipe>
                <Card key={recipe }  className="w-100" >
                <Link
                    to={`/`}
                    variant="outline-primary"
                    onClick={toggleLike}
                    className="btn btn-outline-primary mx-2 mt-2 fs-4 border border-primary rounded"
                    style={{ position: "absolute", top: 0, leaft: 0 }}
                  >
                    Retour
                  </Link>
                  <Button
                    variant="outline-primary"
                    onClick={toggleLike}
                    className="mx-2 mt-2 border   border-white rounded-circle"
                    style={{ position: "absolute", top: 0, right: 0 }}
                  >
                    {liked ? (
                      <FaHeart size={30} color="red" />
                    ) : (
                      <FaHeart size={30} color="gray" />
                    )}
                  </Button>
                  <Card.Img
                    variant="top"
                    src={ bookImage}
                    className="mx-auto mt-3 w-25 "
                  />
                  <Card.Body >
                    <Card.Title className="text-center">
                      {" "}
                      {'recipe.name'}
                    </Card.Title>
                    <Card.Text className="text-center">
                      {'recipe.category'}
                    </Card.Text>
                    <Card.Text className="text-center">
                      Les ingrédients :{" "}
                      {'recipe.ingredients'}
                    </Card.Text>
                    <Card.Text className="text-center">
                      La préparation :{" "}
                      {'recipe.instructions'}
                    </Card.Text>
                    <Card.Text className="text-center">
                      Temps de préparation :{" "} {'recipe.MakingTime'}{" "} min
                    </Card.Text>
                    <Card.Text className="text-center">
                      Temps de cuisson : {" "}{'recipe.cookingTime'} {" "}min
                    </Card.Text>
                    <Card.Text className="text-center">
                      Bienfaits de la recette: {" "}{'recipe.comments'}
                    </Card.Text>
                    <Card.Text className="text-center">
                      L&apos;auteur :{" "}{'recipe.pseudo'}
                    </Card.Text>
                  </Card.Body>
                </Card>
          </FormContainerRecipe>
      
      </>
    );
  }
  export default ReadRecipe;
