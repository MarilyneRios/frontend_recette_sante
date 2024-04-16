import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import {
  useUpdateRecipeMutation,
  useOneRecipeAuthQuery,
} from "../slices/recipesApiSlice";
import { useNavigate } from 'react-router-dom';


const UpdateRecipeScreen = () => {
  const { id } = useParams();
  console.log(`id params : ${id}`)

  const { userInfo } = useSelector((state) => state.auth);

  const [recipe, setRecipe] = useState({
    id: id,
    name: "",
    category: "",
    ingredients: [""],
    instructions: "",
    makingTime: "",
    cookingTime: "",
    comments: "",
    pseudo: "",
    imageUrl: "",
    userId: window.localStorage.getItem("id"),
  });
 
  const navigate = useNavigate();

  const [updateRecipe, { isLoading }] = useUpdateRecipeMutation(id);

  //affiche la recette
  const {data} = useOneRecipeAuthQuery(id);

  const handleChange = (e) => {
     setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };
  
  // Pour récupérer les datas de la recette
  useEffect(() => {
    if (data) {
      console.log("Data useEffect : ", data); 
      console.log("data.id useEffect : ", data._id); 
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        _id: data._id || "",
        name: data.name || "",
        category: data.category || "",
        ingredients: data.ingredients || [""],
        instructions: data.instructions || "",
        makingTime: data.makingTime || "",
        cookingTime: data.cookingTime || "",
        comments: data.comments || "",
        pseudo: data.pseudo || "",
        imageUrl: data.imageUrl || "",
      }));
    }
  }, [data]);

  //add ingrédient 1 par 1
  const handleIngredientChange = (e, index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = e.target.value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };
 
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
   
try {
  console.log("Recipe ID: ", id);
  const res = await updateRecipe({
    id: recipe._id,
    name: recipe.name,
    category: recipe.category,
    ingredients: recipe.ingredients,
    instructions: recipe.instructions,
    makingTime: recipe.makingTime,
    cookingTime: recipe.cookingTime,
    comments: recipe.comments,
    pseudo: recipe.pseudo,
    imageUrl: recipe.imageUrl,
  }).unwrap();
  
  console.log(res);
  console.log("Recipe after update: ", recipe); 
  toast.success("Recette modifiée avec succès.");
  navigate("/");
} catch (error) {
  console.error("Error updating recipe: ", error);
  toast.error("Erreur lors de la modification de la recette.");
}

  };

  return (
    <FormContainer>
      <h1 className="text-center">Modifier une recette</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Nom de la recette :</Form.Label>
          <Form.Control
            className="form-control input-lg"
            type="text"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            placeholder="Ecrire le nom de la recette"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="category">
          <Form.Label>Catégorie : </Form.Label>
          <Form.Control
            as="select"
            className="form-control input-lg"
            aria-label="Default select example"
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

        <Form.Group className="my-2" controlId="ingredients">
          <Form.Label>Les ingrédients :</Form.Label>
          {recipe &&
            recipe.ingredients &&
            recipe.ingredients.map((ingredient, index) => (
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

        <Form.Group className="my-2" controlId="instructions">
          <Form.Label>La préparation :</Form.Label>
          <textarea
            className="form-control input-lg"
            type="text"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            placeholder="Ecrire les diverses étapes de la recette"
          ></textarea>
        </Form.Group>

        <Form.Group className="my-2" controlId="makingTime">
          <Form.Label>Le temps de préparation (min) :</Form.Label>
          <Form.Control
            className="form-control input-lg"
            type="number"
            name="makingTime"
            value={recipe.makingTime}
            onChange={handleChange}
            placeholder="0"
            min="0"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="cookingTime">
          <Form.Label>Le temps de cuisson (min) :</Form.Label>
          <Form.Control
            className="form-control input-lg"
            type="number"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            placeholder="0"
            min="0"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="comments">
          <Form.Label>Les bienfaits de la recette :</Form.Label>
          <Form.Control
            className="form-control input-lg"
            type="text"
            name="comments"
            value={recipe.comments}
            onChange={handleChange}
            placeholder="Ecrire les vertues de la recette"
          ></Form.Control>
        </Form.Group>
            {/*
         <Form.Group className="my-2" controlId="pseudo">
          <Form.Label>Le pseudo de l&apos;auteur :</Form.Label>
          <Form.Control
            className="form-control input-lg"
            type="text"
            name="pseudo"
            value={recipe.pseudo}
            onChange={handleChange}
            placeholder="ex: Doudou"
          ></Form.Control>
        </Form.Group>
             */}


        <Form.Group className="my-2" controlId="imageUrl">
          <Form.Label>Image de la recette :</Form.Label>
          <Form.Control
            className="form-control input-lg"
            type="text"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
            placeholder="Importer le lien url de votre image"
          ></Form.Control>
          {recipe.imageUrl && (
            <img
              src={recipe.imageUrl}
              alt="Aperçu de l'image"
              style={{
                width: "250px",
                display: "block",
                margin: "auto",
                marginTop: "1rem",
              }}
            />
          )}
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3 w-100">
          Modifer la recette
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default UpdateRecipeScreen;
