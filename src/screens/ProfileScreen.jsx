import { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Le mot de passe est incorrect');
    } else {
      console.log('submit');
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        console.log(res);
        //dispatch(setCredentials(res));
        dispatch(setCredentials({...res}));
        toast.success('Le profil est mis à jour avec succès');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Mise à jour du profil</h1>

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
            placeholder='Enter email'
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
            placeholder='Confirm password'
            value={confirmPassword}
            autoComplete='new-password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mt-3'>
          Mettre à jour
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
  
}

export default ProfileScreen