import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TiUserAddOutline } from "react-icons/ti";
import { BsBookmarkPlus } from "react-icons/bs";
import { GoPlusCircle } from "react-icons/go";

import { LinkContainer } from 'react-router-bootstrap';


const Header = () => {
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
              <>
                <NavDropdown title="userInfo.username" id="username">
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>
                    <CgProfile /> Profile
                  </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/'>
                  <NavDropdown.Item className="">
                  <GoPlusCircle /> Ajouter une recette
                </NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/'>
                <NavDropdown.Item className="">
                <BsBookmarkPlus /> Mes favoris
                </NavDropdown.Item>
                </LinkContainer>

                  <NavDropdown.Item>
                    <FaSignOutAlt />
                    Logout
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
