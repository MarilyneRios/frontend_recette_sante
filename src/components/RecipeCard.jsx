import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Button, ListGroup, Col } from "react-bootstrap";
import bookImage from "../assets/book.png";
import { IoCloseCircleSharp } from "react-icons/io5";
import { IoReturnUpBack } from "react-icons/io5";


import { FaHeart, FaRegHeart } from "react-icons/fa";


// eslint-disable-next-line react/prop-types
function RecipeCard({ recipe }) {
  const [liked, setLiked] = useState(false);
  const [isBigCard, setIsBigCard] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  console.log("RecipeCard userInfo" + JSON.stringify(userInfo, null, 2));
  console.log("RecipeCard recipe" + JSON.stringify(recipe, null, 2));

  const handleBigCardClick = () => {
    setIsBigCard(!isBigCard);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <Col md={4}>
      <Card
        // eslint-disable-next-line react/prop-types
        key={recipe.id}
        className={`m-3 ${isBigCard ? "mt-3" : ""}`}
        style={{
          width: isBigCard ? "81vw" : "16rem",
          height: isBigCard ? "90vh" : "auto",
          position: isBigCard ? "fixed" : "relative",
          top: isBigCard ? "51%" : "initial",
          left: isBigCard ? "50%" : "initial",
          transform: isBigCard ? "translate(-50%, -50%)" : "none",
          zIndex: isBigCard ? 1 : 0,
          overflowY: isBigCard ? "scroll" : "visible",
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
          className="p-3 m-auto"
          style={{ width: isBigCard ? "20rem" : "10rem" }}
        />
        <Card.Body>
          <Card.Title className="text-center fs-2">{recipe.name}</Card.Title>
          <Card.Text className="text-center">
            Catégorie : {recipe.category}
          </Card.Text>
          {isBigCard && (
            <>
              <ListGroup variant="flush" className="text-center">
                {" "}
                Les ingrédients :
                {recipe.ingredients
                  ? recipe.ingredients.map((ingredient, index) => (
                      <ListGroup.Item key={index} style={{ border: "none" }}>
                        {ingredient}
                      </ListGroup.Item>
                    ))
                  : ""}
              </ListGroup>
              <Card.Text className="text-center">
                La préparation : {""} {recipe.instructions}
              </Card.Text>
              <Card.Text className="text-center">
                Temps de préparation : {recipe.makingTime} min
              </Card.Text>
              <Card.Text className="text-center">
                Temps de cuisson : {recipe.cookingTime} min
              </Card.Text>
            </>
          )}
          <Card.Text className="text-center">
            Les bienfaits: {recipe.comments}
          </Card.Text>
          <Card.Text className="text-center fs-5">
            <em>L&apos;auteur : {recipe.pseudo}</em>
          </Card.Text>

          <div className="d-flex justify-content-center">
            {!isBigCard ? (
              <Button
                onClick={handleBigCardClick}
                className=" btn btn-lg btn-dark rounded mx-5 my-3"
              >
                Lire
              </Button>
            ) : (
              <>           
              <Button 
                onClick={handleBigCardClick}
                className=" btn btn-lg btn-dark rounded mx-5 my-3"
                style={{ position: "absolute", top: 0, left: -30,  }}
              >
              <IoReturnUpBack />
              </Button>
              </>
              
            )}
          </div>
          <div className="d-flex justify-content-center">
          {userInfo && userInfo.username === recipe.pseudo && (
            <>
              <Link
                to={`/edit-recipe/${recipe.id}`}
                className="btn btn-success mx-2 mt-2"            
              >
                Modifier
              </Link>
              <Button
                className="btn btn-danger rounded mx-2 mt-2"
              >
               Effacer
              </Button>
            </>
          )}
        </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default RecipeCard;
