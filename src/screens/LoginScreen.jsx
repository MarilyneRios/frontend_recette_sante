import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import {useDispatch, useSelector} from 'react-redux';
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const[login, {isLoading}] = useLoginMutation();

  const {userInfo} = useSelector((state)=> state.auth); 

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    try {
      const res = await login({ email, password }).unwrap(); 
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      //console.log(err?.data?.message || err.error);
      toast.error(err?.data?.message || err.error);
    }
  }

  return (
     <FormContainer  style={{backgroundColor: '#f8f9fa'}}>
      <h1 className="text-center">Connexion</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Addresse email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Entrer votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="password">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            placeholder="Entrer votre mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
        {isLoading && <Loader/>}

        <Button
         
          type="submit"
          variant="primary"
          className="mt-3 w-100"
        >
          Se connecter
        </Button>
      </Form>


      <Row className="py-3">
        <Col>
          Nouvel utilisateur? <Link to="/register">Inscription</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default LoginScreen