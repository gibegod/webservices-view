import React, {Component} from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import logo from "../img/logo.png";
import "../css/Nav.css"
import Cookies from "universal-cookie";

const cookies = new Cookies();

class GenericNav extends Component{
    cerrarSesion=()=>{
        cookies.remove("id", {path:"/"});
        cookies.remove("usuario", {path:"/"});
        window.location.href="./";
    }

    render(){
        return <Navbar bg="dark" variant="dark" sticky="top" className="navbar">
                    <Navbar.Brand>
                        <img className="logo" src={logo}/>
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link>Envíos</Nav.Link>
                        <NavDropdown title="Mi cuenta">
                            <NavDropdown.Item>Mi Perfil</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item onClick={()=>this.cerrarSesion()}>Cerrar Sesión</NavDropdown.Item>
                        </NavDropdown> 
                    </Nav>             
                </Navbar>
    }
}

export default GenericNav;
