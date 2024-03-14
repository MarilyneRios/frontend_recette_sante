import Header from "./components/Header"
import './App.css'
import {Outlet} from 'react-router-dom'
import { Container } from 'react-bootstrap';

function App() {


  return (
    <div  style={{ backgroundImage: 'url("/bg3.jpg")', backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
    <Header/>
    <Container className="my-2"/>
    <Outlet /> {/* Point d'insertion pour les écrans spécifiques */}

  
 
    </div>
  )
}

export default App
