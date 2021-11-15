import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link, useHistory } from "react-router-dom";
import "./Navegacion.css";

const Navegacion = () => {
	let history = useHistory();

	let usuarioSesion = localStorage.getItem("usuario");
	let usuarioSesionJSON = JSON.parse(usuarioSesion);

	const handleLogOut = (e) => {
		e.preventDefault();

		localStorage.removeItem("usuario");
		localStorage.removeItem("orden");
		localStorage.removeItem("carrito");
		history.push("/signin");

		window.location.reload();
	};

	return (
		<Navbar bg="dark" variant="dark">
			<Container>
				<Navbar.Brand href="/catalogo">Home</Navbar.Brand>
				<Nav className="me-auto">
					{usuarioSesion === "" || usuarioSesion === null ? (
						<>
							<Nav.Link href="">
								<Link to="/signup" className="link-nav">
									Registrarse
								</Link>
							</Nav.Link>
							<Nav.Link href="">
								<Link to="/signin" className="link-nav">
									Iniciar sesion
								</Link>
							</Nav.Link>
						</>
					) : (
						<>
							<Nav.Link href="">
								<Link to="/misdatos" className="link-nav">
									Mis datos
								</Link>
							</Nav.Link>
							<Nav.Link href="">
								<Link to="/carrito" className="link-nav">
									Carrito
								</Link>
							</Nav.Link>
							<Nav.Link href="">
								<Link to="/compras" className="link-nav">
									Compras
								</Link>
							</Nav.Link>
							<Nav.Link href="">
								<Link to="/reclamos" className="link-nav">
									Reclamos
								</Link>
							</Nav.Link>
							<Nav.Link href="">
								<Link to="/denuncias" className="link-nav">
									Denuncias
								</Link>
							</Nav.Link>
							<Nav.Link href="">
								<Link to="/nuevoproducto" className="link-nav">
									Crear Producto
								</Link>
							</Nav.Link>
							<Nav.Link href="">
								<Link to="/publicaciones" className="link-nav">
									Publicaciones
								</Link>
							</Nav.Link>
    					<Nav.Link href="">
						    <Link to="/mesadeayuda" className="link-nav">Mesa de Ayuda</Link>
					    </Nav.Link>

							<Nav.Link href="" onClick={(e) => handleLogOut(e)}>
								<Link to="/signin" className="link-nav">
									Cerrar sesion
								</Link>
							</Nav.Link>
							<Nav.Link>
								Hola {usuarioSesionJSON.nombre}!
							</Nav.Link>
						</>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
};

export default Navegacion;
