import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const theme = createTheme();

export default function CrearProducto() {
	let history = useHistory();

	let usuarioSesion = localStorage.getItem("usuario");
	//Si el usuario no esta logueado no puede entrar a la pagina
	if (usuarioSesion === "" || usuarioSesion === null) {
		history.push("/signin");
	}

	//Transformo el texto en JSON
	usuarioSesion = JSON.parse(usuarioSesion);

	//States
	const [nombre, setnombre] = useState("");
	const [descripcion, setdescripcion] = useState("");
	const [imagen, setimagen] = useState("");
	const [precio, setprecio] = useState("");
	const [stock, setstock] = useState();
	const [formadepago, setformadepago] = useState("");
	const [showalert, setshowalert] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();
		/*
		//Valido formulario
		if (
			calle.trim() === "" ||
			numero.trim() === "" ||
			localidad.trim() === "" ||
			provincia.trim() === ""
		) {
			setshowalert(true);
			return;
		}

		const data = {
			calle,
			numero,
			piso,
			departamento,
			localidad,
			provincia,
			pais: "Argentina",
			idUsuario: usuarioSesion.id,
		};
		//Envio la info a la api
		const result = await axios.post(
			"http://localhost:8083/usuario/domicilio",
			data
		);
		console.log(result.data);

		//Ir a MisDatos
		history.push("/misdatos");*/
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="sm">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 5,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography component="h1" variant="h5">
						Nuevo producto
					</Typography>

					{showalert ? (
						<Alert
							variant="danger"
							onClose={() => setshowalert(false)}
							dismissible
							style={{ width: "100%" }}
						>
							ERROR: Complete todos los campos requeridos
						</Alert>
					) : null}

					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="nombre"
									label="Nombre"
									name="nombre"
									value={nombre}
									onChange={(e) => setnombre(e.target.value)}
									type="text"
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									multiline
									rows={5}
									id="descripcion"
									label="Descripcion"
									name="descripcion"
									value={descripcion}
									onChange={(e) => setdescripcion(e.target.value)}
									type="text"
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="imagen"
									label="Imagen"
									name="imagen"
									value={imagen}
									onChange={(e) => setimagen(e.target.value)}
									type="text"
								/>
							</Grid>

							<Grid item xs={12} sm={4}>
								<TextField
									required
									fullWidth
									id="precio"
									label="Precio"
									name="precio"
									value={precio}
									onChange={(e) => setprecio(e.target.value)}
									type="number"
								/>
							</Grid>

							<Grid item xs={12} sm={4}>
								<TextField
									required
									fullWidth
									id="stock"
									name="stock"
									label="Stock"
									value={stock}
									onChange={(e) => setstock(e.target.value)}
									type="number"
								/>
							</Grid>

							<Grid item xs={12} sm={4}>
								<FormControl fullWidth>
									<InputLabel id="demo-simple-select-helper-label">
										Forma de pago
									</InputLabel>
									<Select
										labelId="demo-simple-select-helper-label"
										id="demo-simple-select-helper"
										value={formadepago}
										label="Forma de pago"
										onChange={(e) => setformadepago(e.target.value)}
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										{["Credito", "Debito", "Credito y Debito"].map((m, i) => (
											<MenuItem value={i}>{m}</MenuItem>
										))}
									</Select>
								</FormControl>
							</Grid>
							<Grid item xs={12}>
								<div className="d-grid gap-2">
									<Button variant="outline-primary" size="lg" type="submit">
										CREAR PRODUCTO
									</Button>
								</div>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
