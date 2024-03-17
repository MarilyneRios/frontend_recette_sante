import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

const FormContainer = ({ children }) => {
  return (
    <Container  className='mb-5'>
      <Row className='justify-content-md-center mt-5'>
        <Col xs={12} md={6} className='card p-5 custom-bg'>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;

//className='custom-bg'