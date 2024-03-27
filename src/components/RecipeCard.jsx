import { useState } from "react";

import { Card, Button, ListGroup, Col } from "react-bootstrap";
import bookImage from "../assets/book.png";

import { FaHeart, FaRegHeart } from "react-icons/fa";



function RecipeCard({ recipe }) {

  const [liked, setLiked] = useState(false);
  const [isBigCard, setIsBigCard] = useState(false);

  const handleBigCardClick = () => {
    setIsBigCard(!isBigCard);
  };

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <Col md={4}>
      <Card
        key={recipe.id}
        className={`m-3 ${isBigCard ? "mt-3" : ""}`}
        style={{ 
        width: isBigCard ? "81vw" : "16rem", 
        height:  isBigCard ? "90vh" : "auto", 
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
            <FaRegHeart  size={30} color="black"  />
          )}
        </Button>
        <Card.Img
          variant="top"
          src={recipe.imageUrl || bookImage}
          className={`mx-auto mt-${isBigCard ? "5" : "2"} w-${isBigCard ? "25" : "50"}`}
        />
        <Card.Body>
          <Card.Title className="text-center fs-2">{recipe.name}</Card.Title>
          <Card.Text className="text-center"><h5>Catégorie : </h5>{recipe.category}</Card.Text>
          {isBigCard && (
            <>
            <ListGroup variant="flush" className="text-center"> <h5>Les ingrédients :</h5>
              {recipe.ingredients ? recipe.ingredients.map((ingredient, index) => (
                <ListGroup.Item key={index} style={{border: 'none'}}>{ingredient}</ListGroup.Item>
              )) : ""}
            </ListGroup>
              <Card.Text  className="text-center">
              <h5>La préparation : </h5>{""} {recipe.instructions}
              </Card.Text>
              <Card.Text className="text-center">
              <h5> Temps de préparation :</h5> {recipe.makingTime} min
              </Card.Text>
              <Card.Text className="text-center">
              <h5> Temps de cuisson :</h5> {recipe.cookingTime} min
              </Card.Text>
            </>
          )}
          <Card.Text className="text-center">
          <h5> Les bienfaits:</h5> {recipe.comments}
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
            <Button
              onClick={handleBigCardClick}
              className=" btn btn-lg btn-dark rounded mx-5 my-3"
            >
              Retour
            </Button>
          )}
        </div>


        </Card.Body>
      </Card>
    </Col>
  );
}

export default RecipeCard;