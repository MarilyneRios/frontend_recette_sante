import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormContainerRecipe from "../components/FormContainerRecipe";
import { Card, Button, Row, Col, ListGroup } from "react-bootstrap";
import bookImage from "../assets/book.png";
import { useViewRecipeAuthQuery } from "../slices/recipesApiSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { IoReturnUpBack } from "react-icons/io5";
import { useDeleteRecipeMutation } from "../slices/recipesApiSlice";

function ReadRecipe() {
  const { id } = useParams();

  const { userInfo } = useSelector((state) => state.auth);
  console.log("userInfo de ReadRecipe :" + userInfo);

  const [liked, setLiked] = useState(false);
  const [recipe, setRecipe] = useState({
    id: id,
    name: "",
    category: "",
    ingredients: [],
    instructions: "",
    makingTime: 0,
    cookingTime: 0,
    comments: "",
    pseudo: "",
    imageUrl: "",
  });

  //afficher la recette
  const { data, isError, isLoading, isSuccess } = useViewRecipeAuthQuery(id);
  console.log(data);

  useEffect(() => {
    if (data) {
      setRecipe({
        ...recipe,
        name: data.name,
        category: data.category,
        ingredients: data.ingredients,
        instructions: data.instructions,
        makingTime: data.makingTime,
        cookingTime: data.cookingTime,
        comments: data.comments,
        pseudo: data.pseudo,
        imageUrl: data.imageUrl,
      });
    }
  }, [data]);

  //like btn logique
  const toggleLike = () => {
    setLiked(!liked);
  };

  //effacer la recette

  const [deleteRecipe] = useDeleteRecipeMutation();

  const navigate = useNavigate();

  const handleDeleteRecipe = () => {
    console.log("click");
    console.log("Recipe object:", recipe);
    console.log("Recipe ID:", recipe._id);

    deleteRecipe(recipe._id)
      .then((response) => {
        console.log("Recipe deletion response:", response);
      })
      .catch((error) => {
        console.error("Error deleting recipe:", error);
      });
  };

  //modifier la recette
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("click Update");
    console.log("Recipe object Update:", recipe);
    console.log("Recipe ID Update:", recipe._id);

    navigate(`/oneRecipeAuth/${recipe._id}`);
  };

  return (
    <>
      {isLoading && <Loader />}
      {isError && <h3>Something went wrong...</h3>}
      {isSuccess && (
        <FormContainerRecipe className="d-flex align-items-center">
  
          <Card className="w-100 d-flex flex-column flex-md-row align-items-center">
            
          <Card.Img
              variant="right"
              src={recipe.imageUrl || bookImage}
              style={{ maxWidth: "20rem", boxShadow: "0px 0px 10px 10px rgba(0,0,0,0.3)" }}
              className="rounded mt-5 mx-5 order-0 order-md-1"
            />
        
            <Card.Body className="flex-grow-1 text-right order-0 order-md-1">
              <Link
                to={`/`}
                onClick={toggleLike}
                className="btn btn-dark mx-2 mt-2 fs-4 border border-dark rounded"
                style={{ position: "absolute", top: 0, left: 0 }}
              >
                <IoReturnUpBack size={25}/>
              </Link>
  
              <Button
                variant="outline-white"
                onClick={toggleLike}
                className="mx-2 mt-2 border border-white rounded-circle"
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  borderColor: "white",
                }}
              >
                {liked ? (
                  <FaHeart size={30} color="red" />
                ) : (
                  <FaRegHeart size={30} color="black" />
                )}
              </Button>
  
              <Card.Title className="text-center fs-3">{recipe.name}</Card.Title>
              <Card.Text className="text-center fs-5">
              {recipe.category}
              </Card.Text>
  
              <ListGroup variant="flush" className="text-center">
                {" "}
                <em>Ingrédients : </em>
                {recipe.ingredients
                  ? recipe.ingredients.map((ingredient, index) => (
                      <ListGroup.Item key={index} style={{ border: "none" }}>
                        {ingredient}
                      </ListGroup.Item>
                    ))
                  : ""}
              </ListGroup>
  
              <Card.Text className="text-center">
                <strong>Préparation : </strong> {recipe.instructions}
              </Card.Text>
              <Card.Text className="text-center">
                <strong>Temps de préparation : </strong>{recipe.makingTime} min
              </Card.Text>
              <Card.Text className="text-center">
                <strong>Temps de cuisson :  </strong> {recipe.cookingTime} min
              </Card.Text>
              <Card.Text className="text-center">
                <strong>Bienfaits :  </strong>{recipe.comments}
              </Card.Text>
              <Card.Text className="text-center">
                Auteur : {recipe.pseudo}
              </Card.Text>
  
              {userInfo && userInfo.username === recipe.pseudo && (
                <div className="d-flex justify-content-center align-items-center">
                  <Button
                    onClick={handleUpdate}
                    className="btn btn-success mx-2 mt-2 "
                  >
                    Modifier
                  </Button>
                  <Button
                    onClick={handleDeleteRecipe}
                    className="btn btn-danger rounded mx-2 mt-2"
                  >
                    Effacer
                  </Button>
                </div>
              )}
            </Card.Body>
            </Card>
        </FormContainerRecipe>
      )}
    </>
  );
  
}
export default ReadRecipe;
