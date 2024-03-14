import Header from "./components/Header"
import Footer from "./components/Footer"
import './App.css'
import {Outlet} from 'react-router-dom'
import { Container } from 'react-bootstrap';

function App() {


  return (
    <div  
    className="d-flex flex-column min-vh-100"
    style={{ backgroundImage: 'url("/bg3.jpg")', backgroundSize: 'cover', backgroundRepeat: 'repeat' }}>
    <Header/>
    <Container className=" my-auto d-flex align-items-center justify-content-center h-100"/>
    <div className="w-100 ">
    <Outlet />
    </div>
    <Footer />
    </div>
  )
}

export default App