import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
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