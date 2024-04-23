import { useState, useEffect } from "react";
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
    setAvatar(userInfo.avatar);
  }, [userInfo.email, userInfo.username, userInfo.avatar]);

  //image
  //upload image
  const convertToBase64 = (file) => {
    console.log("convertToBase64", file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    const data = new Promise((resolve, reject) => {
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
    return data;
  };

  //Réduire la taille de l'image
  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        // Set the canvas dimensions to the desired size
        canvas.width = 250;
        canvas.height = 250;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(resolve, file.type);
      };
      img.onerror = reject;
      img.src = URL.createObjectURL(file);
    });
  };

  const handleUpdateImage = async (file) => {
    try {
      const resizedImage = await resizeImage(file);
      const base64Image = await convertToBase64(resizedImage);
      setAvatar(base64Image);
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };
  
  // mise à jour
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Le mot de passe est incorrect");
    } else {
      console.log("submit");
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          avatar,
          username,
          email,
          password,
        }).unwrap();
        console.log(res);
        //dispatch(setCredentials(res));
        dispatch(setCredentials({ ...res }));
        toast.success("Le profil est mis à jour avec succès");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Mise à jour du profil</h1>

      <Form onSubmit={handleSubmit}>
        {/* A supprimer quand tout fonctionnera 
      <Form.Group className='my-2' controlId='username'>
          <Form.Label>Pseudo</Form.Label>
          <Form.Control
            type='username'
            placeholder='Entrer votre pseudo'
            value={username}
            autoComplete='username'
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>*/}
        <Form.Group controlId="avatar">
          <Form.Label>Image de la recette :</Form.Label>
          <Form.Control
            type="file"
            name="avatar"
            accept="image/*"
            onChange={(e) => handleUpdateImage(e.target.files[0])}
          />
          {avatar && (
            <img
              src={avatar}
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

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Addresse Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrer votre mot de passe"
            value={password}
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirmer votre mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Mettre à jour
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
