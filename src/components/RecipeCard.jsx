import { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Button, ListGroup, Col } from "react-bootstrap";
import bookImage from "../assets/book.png";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function RecipeCard({ recipe }) {
  const [liked, setLiked] = useState(false);


  const { userInfo } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleReadRecipe = async (e) => {
    e.preventDefault();
   navigate(`/viewRecipeAuth/${recipe._id}`);
  };

  const toggleLike = async (e) => {
    e.preventDefault();
    setLiked(!liked);
   // ajouter une recette dans les favoris avec cette route`/addRecipeFavorite/${recipe._id}`;
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
          <Card.Text className="text-center fs-5">
            {recipe.category}
          </Card.Text>
        
          <Card.Text className="text-center">
            Les bienfaits : {recipe.comments}
          </Card.Text>
          <Card.Text className="text-center ">
            <em>Auteur : {recipe.pseudo || 'inconnu'}</em>
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