
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

const FormContainerRecipeS = ({ children }) => {
  return (
    <Container  className='mb-5'>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={3} md={3} className='card  custom-bg'>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainerRecipeS;
