import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import EditIcon from "@mui/icons-material/Edit";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Publicaciones = () => {
	let history = useHistory();

	let usuarioSesion = localStorage.getItem("usuario");
	//Si el usuario no esta logueado no puede entrar a la pagina
	if (usuarioSesion === "" || usuarioSesion === null) {
		history.push("/signin");
	}

	//Transformo el texto en JSON
	usuarioSesion = JSON.parse(usuarioSesion);

	//States
	const [listaproductos, setlistaproductos] = useState([]);

	const fetchApi = async (id) => {
		const result = await axios.get(`http://localhost:8084/productos/${id}`);
		console.log(result.data);

		setlistaproductos(result.data);
	};

	useEffect(() => {
		fetchApi(usuarioSesion.id);
	}, [usuarioSesion.id]);

	return (
		<Container component="main" maxWidth="md">
			<Table striped bordered hover className="mt-5">
				<thead>
					<tr>
						<th>#</th>
						<th>Nombre</th>
						<th>Precio</th>
						<th>Stock</th>
						<th>Activo</th>
						<th>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{listaproductos.map((p) => (
						<>
							<tr>
								<td>{p.id}</td>
								<td>{p.nombre}</td>
								<td>{p.precio}</td>
								<td>{p.stockActual}</td>
								<td>{p.activo === true ? "Si" : "No"}</td>
								<td>
									<IconButton
										onClick={e => history.push(`/modificarproducto/${p.id}`)}
									>
										<EditIcon fontSize="small"/>
									</IconButton>
									<IconButton>
									<AutorenewIcon fontSize="small"/>
									</IconButton>
								</td>
							</tr>
						</>
					))}
				</tbody>
			</Table>
		</Container>
	);
};

export default Publicaciones;
