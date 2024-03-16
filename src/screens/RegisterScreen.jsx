import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify'
import Loader from '../components/Loader';

const RegisterScreen = () => {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

   const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('les user infos:', { username, email, password, confirmPassword });

      if (password !== confirmPassword) {
        toast.error('Le mot de passe est incorrect');
      } else {
        try {
          console.log('Tentative d’inscription')
          const res = await register({ username, email, password }).unwrap();
          console.log('Registration response:', res);

          dispatch(setCredentials({ ...res }));
          navigate('/');
        } catch (err) {

          toast.error(err?.data?.message || err.error);
        }
      }
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

      {isLoading && <Loader />}
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