/* eslint-disable react/jsx-key */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import bookImage from "../assets/book.png";
import { useAllRecipesAuthQuery } from "../slices/recipesApiSlice";
import { FaHeart } from "react-icons/fa";
import Loader from "../components/Loader";

function ReadRecipeS({ recipes, currentPage }) {
  const [liked, setLiked] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  const { isError, isLoading, isSuccess } = useAllRecipesAuthQuery();
  console.log(recipes);

  const toggleLike = () => {
    setLiked(!liked);
  };

  // Avoir current recipes
  const recipesPerPage = 6;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <>
      {isLoading && <Loader />}
      {isError && <h3>Something is wrong ...</h3>}
      {isSuccess &&
        <Container className="w-75">
          <Row>
            {currentRecipes.map((recipe) => (
              <Col md={4}>
                <Card
                  key={recipe.id}
                  className="m-3 "
                  style={{ width: "16rem", position: "relative" }}
                >
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
                  <Card.Img
                    variant="top"
                    src={recipe.imageUrl || bookImage}
                    className="mx-5 mt-2 w-50"
                  />
                  <Card.Body>
                    <Card.Title className="text-center">
                      {" "}
                      {recipe.name}
                    </Card.Title>
                    <Card.Text className="text-center">
                      {" "}
                      {recipe.category}
                    </Card.Text>
                    <Card.Text className="text-center">
                      De {recipe.pseudo}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      }
    </>
  );

}

export default ReadRecipeS;
