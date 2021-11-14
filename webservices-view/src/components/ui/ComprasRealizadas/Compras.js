import React, { useEffect, useState } from "react";
import { Container, TextField, Grid, Typography } from "@mui/material";
import Button from "react-bootstrap/Button";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import axios from "axios";
import CardCompra from "./CardCompra";

const Compras = () => {
	let history = useHistory();

	let usuarioSesion = localStorage.getItem("usuario");
	//Si el usuario no esta logueado no puede entrar a la pagina
	if (usuarioSesion === "" || usuarioSesion === null) {
		history.push("/signin");
	}

	usuarioSesion = JSON.parse(usuarioSesion);	

	//States
	const [listacompras, setlistacompras] = useState([]);


	const fetchApi = async (idComprador) => {
		const result = await axios.get(`http://localhost:8083/venta/comprador=${idComprador}`);
		console.log(result.data);
		setlistacompras(result.data);
	};

	useEffect(() => {
		fetchApi(usuarioSesion.id);
	}, [usuarioSesion.id]);

	return (
		<Container component="main" maxWidth="md">
			<Grid container spacing={4}>
				<Grid item xs={12}>
				<Typography component="div">
						<Box
							sx={{
								textAlign: "center",
								m: 1,
								fontWeight: "bold",
								fontSize: 30,
							}}
						>
							MIS COMPRAS
						</Box>
					</Typography>
					{listacompras.map((compra) => (
						<>
							<h3>Compra {compra.id}</h3>
							<h4>Estado: </h4>
							<h4>Fecha: </h4>
							{/* {compra.productos.map((prod) => (
								<CardCompra
									key={prod.id}
									id={prod.id}
									nombre={prod.nombre}
									precio={prod.precio}
									imagen={prod.imagen}
									cantidad={prod.cantidad}
								/>
							))} */}
							<h4>Total: $ {compra.total} </h4>

							<Grid item xs={12} sm={6}>
								<Button
									variant="outline-primary"
									onClick={(e) => history.push(`/nuevoreclamo/${compra.id}`)}
								>
									INICIAR RECLAMO
								</Button>
								<Button variant="outline-primary">
									CANCELAR COMPRA
								</Button>
							</Grid>
						</>
					))}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Compras;
