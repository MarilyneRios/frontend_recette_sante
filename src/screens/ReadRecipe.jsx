import { useState } from "react";

import FormContainer from "../components/FormContainer";
import { Image, Button } from "react-bootstrap";
import bookImage from "../assets/book.png";

import { FaRegHeart, FaHeart } from "react-icons/fa";
//import Loader from "../components/Loader";

function ReadRecipe() {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <FormContainer>
      <div className="d-flex flex-column justify-content-center align-items-center container border rounded shadow my-3 ">
        <div className="d-flex w-100 justify-content-center ">
          <div className="position-absolute top-0 end-0 m-3">
            <Button
              variant="outline-primary"
              onClick={toggleLike}
              className="mx-1 mt-1 border   border-white rounded-circle"
              style={{ position: "absolute", top: 0, right: 0 }}
            >
              {liked ? (
                <FaHeart size={30} color="red" />
              ) : (
                <FaHeart size={30} color="gray" />
              )}
            </Button>
          </div>
          <div className="p-2 col-4 mt-3 mx-1">
            {/* Image by OpenClipart-Vectors from Pixabay */}
            <Image
              src={bookImage}
              alt="recipe défaut"
              className="img-fluid w-100 justify-content-center rounded shadow-lg"
              style={{ maxHeight: "300px" }}
            />
          </div>
        </div>

        <h4>Nom de la recette :</h4>
        <h5 className="mt-2">La catégorie : </h5>
        <h5 className="mt-2">Les ingrédients :</h5>
        <h5 className="mt-2">La préparation :</h5>

        <p className="mt-2">Le temps de préparation : (minutes)</p>
        <p className="mt-2">Le temps de cuisson : (minutes)</p>

        <p className="mt-2">Les bienfaits de la recette :</p>

        <p className="mt-2">L&apos;auteur : </p>
      </div>
    </FormContainer>
  );
}

export default ReadRecipe;
