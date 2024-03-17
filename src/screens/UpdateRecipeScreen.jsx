import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from 'react-redux';

const UpdateRecipeScreen = () => {

   const { userInfo } = useSelector((state) => state.auth);
   const {recipeInfo} = useSelector((state)=> state.recipe);

   
  const [recipe, setRecipe] = useState({
    name: "",
    category: "",
    ingredients: [],
    instructions: "",
    makingTime: "",
    cookingTime: "",
    comments: "",
    pseudo: "",
    imageUrl: "",
    userId: window.localStorage.getItem("id"),
  });
  
   const [name, setName] = useState("");
   const [category, setCategory] = useState("");
   const [ingredients, setIngredients] = useState("");
   const [instructions, setInstructions] = useState("");
   const [makingTime, setMakingTime] = useState("");
   const [cookingTime, setCookingTime] = useState("");
   const [comments, setComments] = useState("");
   const [pseudo, setPseudo] = useState("");
   const [imageUrl, setImageUrl] = useState("");

   const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

   // Fonction pour gérer la soumission du formulaire
   const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`les infos de la recette : ${recipe}`)
  };

  return (
    <FormContainer>
    <h1 className="text-center">Modifier la recette</h1>
    <Form onSubmit={handleSubmit}>

      <Form.Group className='my-2' controlId='username'>
        <Form.Label>Nom de la recette :</Form.Label>
        <Form.Control
       className="form-control input-lg"
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Ecrire le nom de la recette"
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='category'>
        <Form.Label>Catégorie : </Form.Label>
        <Form.Control as="select"
            className="form-control input-lg"
            aria-label="Default select example"
            id="category"
            name="category"
            value={recipe.category}
            onChange={handleChange}
          >
            <option value="">Selectionner une catégorie</option>
            <option value="Apéritif">Apéritif</option>
            <option value="Entrée">Entrée</option>
            <option value="Plat">Plat</option>
            <option value="Dessert">Dessert</option>
            <option value="Boisson">Boisson</option>
          </Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='ingredients'>
          <Form.Label>Les ingrédients :</Form.Label>
          {recipe && recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              className="form-control input-lg"
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(e) => handleIngredientChange(e, index)}
              placeholder="Ecrire un ingrédient"
            />
          ))}
          <Button
            className="btn-primary w-100 mx-2"
            onClick={addIngredient}
            type="button"
          >
            Ajouter un ingrédient
          </Button>
        </Form.Group>
     
        <Form.Group className='my-2' controlId='instructions'>
        <Form.Label>La préparation :</Form.Label>
        <Form.Control
       className="form-control input-lg"
            type="text"
            name="instructions"
            onChange={handleChange}
            placeholder="Ecrire les diverses étapes de la recette"
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='makingTime'>
        <Form.Label>Le temps de préparation (min) :</Form.Label>
        <Form.Control
       className="form-control input-lg"
            type="number"
            name="makingTime"
            onChange={handleChange}
            placeholder="0"
            min="0"
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='cookingTime'>
        <Form.Label>Le temps de cuisson (min) :</Form.Label>
        <Form.Control
       className="form-control input-lg"
            type="number"
            name="cookingTime"
            onChange={handleChange}
            placeholder="0"
            min="0"
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='comments'>
        <Form.Label>Les bienfaits de la recette :</Form.Label>
        <Form.Control
       className="form-control input-lg"
            type="text"
            name="comments"
            onChange={handleChange}
            placeholder="Ecrire les vertues de la recette"
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='pseudo'>
        <Form.Label>Le pseudo de l&apos;auteur :</Form.Label>
        <Form.Control
       className="form-control input-lg"
            type="text"
            name="pseudo"
            onChange={handleChange}
            placeholder="ex: Doudou"
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='imageUrl'>
        <Form.Label>Image de la recette :</Form.Label>
        <Form.Control
       className="form-control input-lg"
            type="text"
            name="imageUrl"
            onChange={handleChange}
            placeholder="Importer le lien url de votre image"
        ></Form.Control>
      </Form.Group>

      <Button type='submit' variant='primary' className='mt-3 w-100'>
          Modifier la recette
      </Button>
      
     {/* {isLoading && <Loader />} */} 
      </Form>

    </FormContainer>
  )
}

export default UpdateRecipeScreen