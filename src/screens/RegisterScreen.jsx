import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { FaEye } from "react-icons/fa"; //<FaEye />
import { FaEyeSlash } from "react-icons/fa6"; //<FaEyeSlash />

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword]= useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const translateError = (error) => {
    if (error.includes("Invalid email or password")) {
      return "Email ou mot de passe incorrect";
    } else {
      return "Erreur inconnue";
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("les user infos:", {
      username,
      email,
      password,
      confirmPassword,
    });
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError("Email non conforme");
    } else {
      setEmailError("");
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas");
    } else {
      setConfirmPasswordError("");
    }
  
    // Si l'email n'est pas conforme ou si les mots de passe ne correspondent pas, arrêtez la fonction ici
    if (emailError || confirmPasswordError) {
      return;
    }
  
    try {
      console.log("Tentative d’inscription");
      const res = await register({ username, email, password }).unwrap();
      console.log("Registration response:", res);
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(translateError(err?.data?.message || err.error));
    }
  };
  

  return (
    <FormContainer>
      <h1 className="text-center">Inscription</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="username">
          <Form.Label>Pseudo</Form.Label>
          <Form.Control
            type="username"
            placeholder="Entrer votre pseudo"
            value={username}
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Addresse Email</Form.Label>
          <Form.Control
            type="email"
            placeholder='"nom@exemple.com"'
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          {emailError && <div className="alert alert-danger">{emailError}</div>}
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
        <Form.Label>Mot de passe</Form.Label>
        <div className="d-flex">
        <Form.Control
        type={showPassword ? "text" : "password"}
          placeholder='Entrer votre mot de passe'
          value={password}
          autoComplete='new-password'
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
              <Button variant="secondary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
        </div>

      </Form.Group>

        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirmer votre mot de passe</Form.Label>
          <div className="d-flex">
          <Form.Control
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmer votre mot de passe"
            value={confirmPassword}
            autoComplete="new-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
                <Button variant="secondary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </div>
  
          {confirmPasswordError && (
            <div className="alert alert-danger">{confirmPasswordError}</div>
          )}
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3 w-100">
          S&apos;enregistrer
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          Vous avez déjà un compte? <Link to={`/login`}>Connexion</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
