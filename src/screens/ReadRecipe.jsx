/*import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FormContainerRecipe from "../components/FormContainerRecipe";
import { Card, Button } from "react-bootstrap";
import bookImage from "../assets/book.png";
import { useOneRecipeAuthQuery } from "../slices/recipesApiSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Loader from "../components/Loader";
import {  Link } from "react-router-dom";*/
import '../App.css'

function ReadRecipe() { //recipeProps
 /*
  const { userInfo } = useSelector((state) => state.auth);
  console.log("userInfo :"+ userInfo);

  // Récupérer l'identifiant de la recette 
  const { id } = recipeProps; 
  console.log("useParams :"+ id);

  const [liked, setLiked] = useState(false);
  const [recipe, setRecipe] = useState({
    id: id,
    name: '',
    category: '',
    ingredients: [],
    instructions: '',
    makingTime: 0,
    cookingTime: 0,
    comments: '',
    pseudo: '',
    imageUrl: '',
  });

  const { data, isError, isLoading, isSuccess } = useOneRecipeAuthQuery(id);
  console.log(data);

  // Mettre à jour l'état du user qd les datas sont récupérées
  useEffect(()=> {
    if(data) {
      setRecipe(data);
    } 
  },[data]); 

   //like btn logique
    const toggleLike = () => {
      setLiked(!liked);
    };*/

    return (
      <>
      {/*
      {isLoading && <Loader />}
      {isError && <h3>Something went wrong...</h3>}
      {isSuccess && (
          <FormContainerRecipe>
                <Card  className="w-100" >
                <Link
                    to={`/`}
                    onClick={toggleLike}
                    className="btn btn-outline-dark mx-2 mt-2 fs-4 border border-dark rounded"
                    style={{ position: "absolute", top: 0, left: 0 }}
                  >
                    Retour
                  </Link>
                  <Button
                    variant="outline-white"
                    onClick={toggleLike}
                    className="mx-2 mt-2 border  border-white rounded-circle"
                    style={{ position: "absolute", top: 0, right: 0, borderColor: 'white' }}
                    >
                    {liked ? (
                      <FaHeart size={30} color="red" />
                    ) : (
                      <FaRegHeart  size={30} color="black"  />
                    )}
                  </Button>
                  <Card.Img
                    variant="top"
                    src={recipe.imageUrl || bookImage}
                    className="mx-auto mt-3 w-10"
                  />
                  <Card.Body >
                    <Card.Title className="text-center">
                      {recipe.name}
                    </Card.Title>
                    <Card.Text className="text-center">
                      {recipe.category}
                    </Card.Text>
                    <Card.Text className="text-center">
                    Les ingrédients : {recipe.ingredients ? recipe.ingredients.join(", ") : ""}                    </Card.Text>
                    <Card.Text className="text-center">
                      La préparation : {recipe.instructions}
                    </Card.Text>
                    <Card.Text className="text-center">
                      Temps de préparation : {recipe.makingTime} min
                    </Card.Text>
                    <Card.Text className="text-center">
                      Temps de cuisson : {recipe.cookingTime} min
                    </Card.Text>
                    <Card.Text className="text-center">
                      Bienfaits de la recette: {recipe.comments}
                    </Card.Text>
                    <Card.Text className="text-center">
                      L&apos;auteur : {recipe.pseudo}
                    </Card.Text>
                  </Card.Body>
                </Card>
          </FormContainerRecipe>
          )}*/}
      </>
    );
  }
  export default ReadRecipe;
