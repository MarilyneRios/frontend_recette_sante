import { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";


const RegisterScreen = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
  }

  return (
    <FormContainer>
    <h1 className="text-center">Inscription</h1>
    <Form onSubmit={handleSubmit}>
      <Form.Group className='my-2' controlId='username'>
        <Form.Label>Pseudo</Form.Label>
        <Form.Control
          type='username'
          placeholder='Entrer votre pseudo'
          value={username}
          autoComplete='username'
          onChange={(e) => setUsername(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='email'>
        <Form.Label>Addresse Email</Form.Label>
        <Form.Control
          type='email'
          placeholder='Entrer votre email'
          value={email}
          autoComplete='email'
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='password'>
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type='password'
          placeholder='Entrer votre mot de passe'
          value={password}
          autoComplete='new-password'
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>

      </Form.Group>
      <Form.Group className='my-2' controlId='confirmPassword'>
        <Form.Label>Confirmer votre mot de passe</Form.Label>
        <Form.Control
          type='password'
          placeholder='Confirmer votre mot de passe'
          value={confirmPassword}
          autoComplete='new-password'
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Button type='submit' variant='primary' className='mt-3 w-100'>
          S&apos;enregistrer
      </Button>


    </Form>

    <Row className='py-3'>
      <Col>
        Vous avez déjà un compte? <Link to={`/login`}>Connexion</Link>
      </Col>
    </Row>
  </FormContainer>
  )
}

export default RegisterScreen