import React, { useState } from "react";
import { Container, TextField, Grid, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import CardTarjeta from "./Cards/CardTarjeta";
import CardDomicilio from "./Cards/CardDomicilio";

const DatosUsuario = () => {
	let history = useHistory();

	//States
	const [nombre, setnombre] = useState("");
	const [apellido, setapellido] = useState("");
	const [usuario, setusuario] = useState("");
	const [tipousuario, settipousuario] = useState("");
	const [dni, setdni] = useState("");
	const [password, setpassword] = useState("");
	const [telefono, settelefono] = useState("");
	const [domicilios, setdomicilios] = useState([]);
	const [tarjetas, settarjetas] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<Container component="main" maxWidth="sm">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
				component="form"
				noValidate
				onSubmit={handleSubmit}
			>
				<Grid container spacing={4}>
					<Grid item xs={12} sm={4}>
						<TextField
							id="nombre"
							fullWidth
							label="Nombre"
							variant="standard"
							InputLabelProps={{
								shrink: true,
							}}
							value={nombre}
							onChange={(e) => setnombre(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={4}>
						<TextField
							id="apellido"
							fullWidth
							label="Apellido"
							variant="standard"
							InputLabelProps={{
								shrink: true,
							}}
							value={apellido}
							onChange={(e) => setapellido(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							id="dni"
							fullWidth
							label="DNI"
							variant="standard"
							InputLabelProps={{
								shrink: true,
							}}
							value={dni}
							onChange={(e) => setdni(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="usuario"
							fullWidth
							label="Usuario"
							variant="standard"
							InputLabelProps={{
								shrink: true,
							}}
							value={usuario}
							onChange={(e) => setusuario(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							id="tipousuario"
							fullWidth
							label="Tipo"
							variant="standard"
							InputLabelProps={{
								shrink: true,
							}}
							InputProps={{
								readOnly: true,
							}}
							value={tipousuario}
							onChange={(e) => settipousuario(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							id="telefono"
							fullWidth
							label="Telefono"
							variant="standard"
							InputLabelProps={{
								shrink: true,
							}}
							value={telefono}
							onChange={(e) => settelefono(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							id="password"
							fullWidth
							label="Contraseña"
							type="password"
							variant="standard"
							InputLabelProps={{
								shrink: true,
							}}
							value={password}
							onChange={(e) => setpassword(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<Button variant="outlined" type="submit">
							Editar datos
						</Button>
					</Grid>
				</Grid>
			</Box>

			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Typography component="h1" variant="h5">
						Tarjetas
					</Typography>
					<CardTarjeta />
					<CardTarjeta />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Button
						variant="outlined"
						onClick={(e) => history.push("/nuevatarjeta")}
					>
						Agregar Tarjeta
					</Button>
				</Grid>
				<Grid item xs={12}>
					<Typography component="h1" variant="h5">
						Domicilios
					</Typography>
					<CardDomicilio />
					<CardDomicilio />
				</Grid>
				<Grid item xs={12} sm={6}>
					<Button variant="outlined" onClick={(e) => history.push("/nuevodomicilio")}>
						Agregar Domicilio
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
};

export default DatosUsuario;
