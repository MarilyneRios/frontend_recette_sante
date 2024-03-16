import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TiUserAddOutline } from "react-icons/ti";
import { BsBookmarkPlus } from "react-icons/bs";
import { GoPlusCircle } from "react-icons/go";

import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

 
 const [logoutApiCall] = useLogoutMutation();

 const handleLogout = async () => {
   try {
     await logoutApiCall().unwrap();
     dispatch(logout());
     navigate('/login');
   } catch (err) {
     console.error(err);
   }
 };
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
          <Navbar.Brand>Mon cahier de recettes</Navbar.Brand>
        </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">

            <Nav className="ms-auto  d-flex align-items-center justify-content-center">
            {userInfo ? (
              <>
                <NavDropdown title={userInfo.username} id="username">
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    <CgProfile /> Profile
                  </NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to='/profile'>
                  <NavDropdown.Item >
                  <GoPlusCircle /> Ajouter une recette
                </NavDropdown.Item>
                </LinkContainer>
                
                <LinkContainer to='/profile'>
                <NavDropdown.Item >
                <BsBookmarkPlus /> Mes favoris
                </NavDropdown.Item>
                </LinkContainer>

                  <NavDropdown.Item onClick={handleLogout}>
                    <FaSignOutAlt />
                    Déconnexion
                  </NavDropdown.Item>

                </NavDropdown>
                <NavDropdown title="Par catégories" id="category" className="mx-2">
                  <NavDropdown.Item>
                    Apéro
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    Entrée
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                   Plat
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                   Dessert
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    Boissons
                  </NavDropdown.Item>

                </NavDropdown>
             
              </>
              ) : (
              <>
              <LinkContainer to='/login'>
              <Nav.Link>
                  <FaSignInAlt /> Se Connecter
                </Nav.Link>

              </LinkContainer>
              <LinkContainer to='/register'> 
                 <Nav.Link>
                  <TiUserAddOutline /> s&apos;inscrire
                </Nav.Link>
              </LinkContainer>
              </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
