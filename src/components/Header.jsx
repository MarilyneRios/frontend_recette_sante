import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TiUserAddOutline } from "react-icons/ti";

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Navbar.Brand>Mon cahier de recettes</Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <>
                <NavDropdown title="userInfo.username" id="username">
                  <NavDropdown.Item>
                    <CgProfile /> Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <FaSignOutAlt />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Filtrer par catégories" id="category">
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
                <NavDropdown.Item className="text-white">
                  Ajouter une recette
                </NavDropdown.Item>
                
                <NavDropdown.Item className="text-white">
                Mes favoris
                </NavDropdown.Item>
              </>

              <>
                <Nav.Link>
                  <FaSignInAlt /> Se Connecter
                </Nav.Link>

                <Nav.Link>
                  <TiUserAddOutline /> s&apos;inscrire
                </Nav.Link>
              </>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
