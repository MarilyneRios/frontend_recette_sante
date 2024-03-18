import { useState } from "react";
import { Card } from 'react-bootstrap';
//import FormContainerRecipeS from "../components/FormContainerRecipeS";
import { Image, Button } from "react-bootstrap";
import bookImage from "../assets/book.png";

import { FaRegHeart, FaHeart } from "react-icons/fa";
//import Loader from "../components/Loader";

function ReadRecipeS() {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };
  

  return (
    <Card style={{ width: '16rem', position: 'relative' }}>
      <Button 
        variant="outline-primary" 
        onClick={toggleLike} 
        className="mx-1 mt-1 border   border-white rounded-circle"
        style={{ position: 'absolute', top: 0, right: 0 }}
      >
        {liked ? <FaHeart size={30} color="red" /> : <FaHeart size={30} color="gray" />}
      </Button>
      <Card.Img variant="top" src={bookImage} 
      className="mx-5 mt-2 w-50"
      />
      <Card.Body>
        <Card.Title>Nom de la recette</Card.Title>
        <Card.Text>
        <h6 className="mt-2">Catégorie : </h6>
        <p className="mt-2">Bienfaits de la recette :</p>
        <p className="mt-2">L&apos;auteur : </p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ReadRecipeS;