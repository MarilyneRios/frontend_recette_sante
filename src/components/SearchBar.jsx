import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SearchBar = () => {

  return (
<Navbar className="bg-body-dark justify-content-between">
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Rechercher une recette"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Rechercher</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}

export default SearchBar