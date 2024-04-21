import { useState} from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { RxCross1 } from "react-icons/rx";
import { useAddRecipeMutation } from '../slices/recipesApiSlice';

import { toast } from 'react-toastify'
import Loader from '../components/Loader';

const CreateRecipeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  console.log("createRecipe userInfo" + JSON.stringify(userInfo, null, 2))

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
    userId: window.localStorage.getItem("id"),
  });

  const navigate = useNavigate();

  const[createRecipe, {isLoading}] = useAddRecipeMutation();
 
  const handleChange = (e) => {
      const { name, value } = e.target;
      setRecipe({ ...recipe, [name]: value });
  };

   //ajout ingrédient
  const handleIngredientChange = (e, index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = e.target.value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  //supp ingrédient
  const removeIngredient = (index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log("Submitting recipe:", recipe); 
    try {
      const result = await createRecipe(recipe).unwrap();
      //console.log("Recipe created successfully:", result);
      toast.success("Recette créée avec succès." );
      navigate('/');
    } catch (error) {
     // console.error("Error creating recipe:", error);
      toast.error("Erreur lors de la création de la recette." );
    }
  };
  
  return (
    <FormContainer >
    <h1 className="text-center">Créer une recette</h1>
    <Form onSubmit={handleSubmit}>

      <Form.Group className='my-2' controlId='name'>
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
          {/* Affichage des champs d'ingrédients avec la possibilité de supprimer */}
          {recipe && recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                className="form-control input-lg"
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(e, index)}
                placeholder="Ecrire un ingrédient"
              />
              <Button
                className="btn-danger mx-2"
                onClick={() => removeIngredient(index)}
                type="button"
              >
                <RxCross1 />
              </Button>
            </div>
          ))}
          {/* Bouton pour ajouter un ingrédient */}
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
        <textarea
       className="form-control input-lg"
            type="text"
            name="instructions"
            onChange={handleChange}
            placeholder="Ecrire les diverses étapes de la recette"
        ></textarea>
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


      <Form.Group className='my-2' controlId='imageUrl'>
        <Form.Label>Image de la recette :</Form.Label>
        <Form.Control
       className="form-control input-lg"
            type="text"
            name="imageUrl"
            onChange={handleChange}
            placeholder="Importer le lien url de votre image"
        ></Form.Control>
          {recipe.imageUrl && <img src={recipe.imageUrl} alt="Aperçu de l'image" 
          style={{ width: '250px', display: 'block', margin: 'auto', marginTop: '1rem' }} />}
      </Form.Group>

      <Button type='submit' variant='primary' className='mt-3 w-100'>
          Enregistrer la recette
      </Button>
      
      {isLoading && <Loader />} 
      </Form>

    </FormContainer>
  )
}

export default CreateRecipeScreen
