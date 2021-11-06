import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, useHistory } from "react-router-dom";

const Navegacion = () => {
	let history = useHistory();

	const handleLogOut = (e) => {
		e.preventDefault();
		
		localStorage.setItem("usuario", "");
		localStorage.setItem("orden", "");
		localStorage.setItem("carrito", "");
		history.push("/signin");
	}

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/">Navbar</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link href="">
						<Link to="/signup">SignUp</Link>
					</Nav.Link>
					<Nav.Link href="">
						<Link to="/signin">SignIn</Link>
					</Nav.Link>
					<Nav.Link href="">
						<Link to="/">Home</Link>
					</Nav.Link>
					<Nav.Link href="">
						<Link to="/misdatos">Mis datos</Link>
					</Nav.Link>
					<Nav.Link href="">
						<Link to="/catalogo">Catalogo</Link>
					</Nav.Link>
					<Nav.Link href="">
						<Link to="/carrito">Carrito</Link>
					</Nav.Link>
					<Nav.Link href="">
						<Link to="/compras">Compras</Link>
					</Nav.Link>
					<Nav.Link href="">
						<Link to="/reclamos">Reclamos</Link>
					</Nav.Link>
					<Nav.Link href="">
						<Link to="/denuncias">Denuncias</Link>
					</Nav.Link>
					<Nav.Link href="">
						<Link to="/nuevoproducto">Crear Producto</Link>
					</Nav.Link>
					<Nav.Link href="">
						<Link to="/publicaciones">Publicaciones</Link>
					</Nav.Link>
					<Nav.Link href="" onClick={e => handleLogOut(e)}>
						<Link to="/">Cerrar sesion</Link>
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default Navegacion;
