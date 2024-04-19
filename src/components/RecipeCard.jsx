import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { Card, Button, Col } from "react-bootstrap";
import bookImage from "../assets/book.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  useAddRecipeFavoriteMutation,
  useRemoveRecipeFavoriteMutation,
  useAllRecipesFavoriteQuery,

} from "../slices/recipesApiSlice";

// eslint-disable-next-line react/prop-types
function RecipeCard({ recipe }) {

  const { userInfo } = useSelector((state) => state.auth);
  const [liked, setLiked] = useState(false);
  const {data: favoriteRecipes} = useAllRecipesFavoriteQuery()
  const [addRecipeFavorite] = useAddRecipeFavoriteMutation();
  const [removeRecipeFavorite] = useRemoveRecipeFavoriteMutation();

  const navigate = useNavigate();

  //Favoris
  useEffect(() => {
    console.log("favoriteRecipes useEffect",favoriteRecipes);
    console.log("Checking if recipe is in favoriteRecipes"); 
    if (favoriteRecipes && favoriteRecipes.some(favRecipe => favRecipe._id === recipe._id)) {
      console.log("Recipe is in favoriteRecipes");
      setLiked(true);
    } else {
      console.log("Recipe is not in favoriteRecipes");
      setLiked(false);
    }
  }, [favoriteRecipes, recipe._id]);
  

  const handleReadRecipe = (e) => {
    e.preventDefault();
    navigate(`/viewRecipeAuth/${recipe._id}`);
  };

  const toggleLike = (e) => {
    e.preventDefault();
    setLiked(!liked);
    if (!liked) {
      handleAddRecipeFavorite();
    } else {
      handleremoveRecipeFavorite();
    }
  };

  const handleAddRecipeFavorite = () => {
    
    if(favoriteRecipes && favoriteRecipes._id === recipe._id){
      console.log("Recipe is already in Favorite")
    }
    else{
      setLiked(!liked);
      addRecipeFavorite(recipe._id)
      .then((response) => {
        console.log("RecipeFavorite add:", response);
      })
      .catch((error) => {
        console.error("Error add RecipeFavorite:", error);
      });
    }

  };

  const handleremoveRecipeFavorite = () => {
    setLiked(!liked);

    removeRecipeFavorite(recipe._id)
      .then((response) => {
        console.log("RecipeFavorite remove:", response);
      })
      .catch((error) => {
        console.error("Error remove RecipeFavorite:", error);
      });
  };

  return (
    <Col md={4}>
      <Card
        // eslint-disable-next-line react/prop-types
        key={recipe.id}
        className="text-center"
        style={{
          width: "18rem",
          height: "30rem",
          margin: "20px auto",
        }}
      >
        <Button
          variant="outline-primary"
          onClick={toggleLike}
          className="mx-1 mt-1 border border-white bg-white"
          style={{ position: "absolute", top: 0, right: 0 }}
        >
          {liked ? (
            <FaHeart size={30} color="red" />
          ) : (
            <FaRegHeart size={30} color="black" />

          )}
        </Button>
        <Card.Img
          variant="top"
          // eslint-disable-next-line react/prop-types
          src={recipe.imageUrl || bookImage}
          className="p-3 m-auto "
          style={{ width: "10rem" }}
        />
        <Card.Body>
          <Card.Title className="text-center fs-4">{recipe.name}</Card.Title>
          <Card.Text className="text-center fs-5">{recipe.category}</Card.Text>

          <Card.Text className="text-center">
            Les bienfaits : {recipe.comments}
          </Card.Text>
          <Card.Text className="text-center ">
            <em>Auteur : {recipe.pseudo || "inconnu"}</em>
          </Card.Text>

          <div className="d-flex justify-content-center">
            <Button
              onClick={handleReadRecipe}
              className=" btn btn-lg btn-dark rounded mx-5 my-3"
            >
              Lire
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default RecipeCard;
