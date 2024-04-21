import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useAddRecipeMutation } from "../slices/recipesApiSlice";
import { IoCloudUploadOutline } from "react-icons/io5";

import { toast } from "react-toastify";
import Loader from "../components/Loader";
//fileBse64
import FileBase64 from "react-file-base64";

const CreateRecipeScreen = () => {
  // Récupération des informations de l'utilisateur connecté depuis le store Redux
  const { userInfo } = useSelector((state) => state.auth);
  // Déclaration de l'état local recipe pour stocker les données du formulaire
  console.log("createRecipe userInfo" + JSON.stringify(userInfo, null, 2));
  const [recipe, setRecipe] = useState({
    name: "",
    category: "",
    ingredients: [],
    instructions: "",
    makingTime: "",
    cookingTime: "",
    comments: "",
    pseudo: userInfo.username,
    imageUrl: "",
    // Récupération de l'ID de l'utilisateur depuis le stockage local
    userId: window.localStorage.getItem("id"),
  });

  // Hook useNavigate pour la navigation
  const navigate = useNavigate();

  // Hook useAddRecipeMutation pour l'ajout d'une recette
  const [createRecipe, { isLoading }] = useAddRecipeMutation();

  //fileBse64
  const [file, setFile] = useState("");
  const [image, setImage] = useState("");

  // fileBase64

  const convertToBase64 = (file) => {
    console.log("convertToBase64", file);
    // Création d'une instance de FileReader
    const reader = new FileReader();
    // Lecture du contenu du fichier en tant que base64
    reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);// Résolution de la promesse avec le résultat de la conversion en base64
      reader.onerror = (error) => reject(error);// En cas d'erreur lors de la lecture du fichier
    });
    return data;
  };

  // Fonction pour gérer la mise à jour de l'image
  const handleUpdateImage = async (file) => {
    // Conversion de l'image en base64
    const base64Image = await convertToBase64(file); 
    // Mise à jour de l'état local recipe avec l'URL de l'image en base64
  };
    setRecipe({ ...recipe, imageUrl: base64Image });
  };

  const handleChange = (e) => {
    // Récupération du nom et de la valeur du champ modifié
    const { name, value } = e.target;
    // Mise à jour de l'état local recipe avec la nouvelle valeur du champ modifié
    setRecipe({ ...recipe, [name]: value });
  };

  //ajout ingrédient
  const handleIngredientChange = (e, index) => {
    // Copie des ingrédients existants
    const newIngredients = [...recipe.ingredients];
    // Mise à jour de l'ingrédient à l'index spécifié avec la nouvelle valeur
    newIngredients[index] = e.target.value;
    // Mise à jour de l'état local recipe avec les nouveaux ingrédients
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    // Ajout d'un nouvel élément vide à la liste des ingrédients
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    // Empêche le comportement par défaut du formulaire
    e.preventDefault();
    //console.log("Submitting recipe:", recipe);
    try {
      // Envoie de la recette à l'API et récupération du résultat
      const result = await createRecipe(recipe).unwrap();
      // Affichage d'un message de succès
      toast.success("Recette créée avec succès.");
      // Redirection vers la page d'accueil après la création de la recette
      navigate("/");
    } catch (error) {
      toast.error("Erreur lors de la création de la recette.");
    }
  };

  return (
    <FormContainer>
      <h1 className="text-center">Créer une recette</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Nom de la recette :</Form.Label>
          <Form.Control
            className="form-control input-lg"
            type="text"
            name="name"
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
            onChange={handleChange}
            placeholder="Ecrire les vertues de la recette"
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="imageUrl">
          <Form.Label>Image de la recette :</Form.Label>
          <Form.Control
            className="form-control input-lg"
            type="file"
            name="imageUrl"
            accept="image/*"
            onChange={(e) => handleUpdateImage(e.target.files[0])}
          />
          {file && (
            <img
              src={file}
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
          Enregistrer la recette
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default CreateRecipeScreen;
