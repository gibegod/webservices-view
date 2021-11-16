import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import Button from "react-bootstrap/Button";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import axios from "axios";

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
								marginTop: 2,
								marginBottom: 2
							}}
						>
							MIS COMPRAS
						</Box>
					</Typography>
					{listacompras.map((compra) => (
						<>
							<h3><b>Compra {compra.id}</b></h3>
							<h4><b>Estado:</b> {compra.estado}</h4>
							<h4><b>Fecha:</b> {compra.fecha}</h4>
							<h4><b>Total:</b> $ {compra.precioTotal} </h4>

							<Grid item xs={12} sm={6} className="mb-4">
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
