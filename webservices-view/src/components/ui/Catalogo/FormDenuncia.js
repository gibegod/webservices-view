import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

const categoriasdenunciaprueba = [
	"Falsificación",
	"Producto ilegal",
	"Fraude",
	"Contenido inapropiado",
	"Otro",
];

const theme = createTheme();

export default function FormDenuncia() {
	let history = useHistory();

	let usuarioSesion = localStorage.getItem("usuario");
	//Si el usuario no esta logueado no puede entrar a la pagina
	if (usuarioSesion === "" || usuarioSesion === null) {
		history.push("/signin");
	}

	usuarioSesion = JSON.parse(usuarioSesion);

	//States
	const [categoriadenuncia, setcategoriadenuncia] = useState("");
	const [producto, setproducto] = useState({});
	const [comentario, setcomentario] = useState("");
	const [showalert, setshowalert] = useState(false);

	//Parametro que llega desde la url
	const idProducto = useParams().id;

	const fetchApi = async (idProducto) => {
		const result = await axios.get(
			`http://localhost:8084/productos/ProductoId=${idProducto}`
		);
		console.log(result.data);

		setproducto(result.data);
	};

	useEffect(() => {
		if (idProducto !== undefined) {
			fetchApi(idProducto);
		}
	}, [idProducto]);

	const handleSubmit = async (event) => {
		event.preventDefault();

		//Validacion
		if(categoriadenuncia === "" || comentario.trim() === ""){
			setshowalert(true);
			return;
		}

		const data = {
			//idCategoria,
			idProducto,
			idComprador: usuarioSesion.id,
			comentario
		};

		//Envio la info a la api
		const result = await axios.post("http://localhost:8083/denunciar/denunciar", data);

		console.log(result.data);


		//Si hay un error mostrar en pantalla
		//Si no hay error pushear a pantalla principal
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="md">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography component="div">
						<Box
							sx={{
								textAlign: "center",
								m: 1,
								fontWeight: "bold",
								fontSize: 30,
							}}
						>
							NUEVA DENUNCIA
						</Box>
					</Typography>

					{showalert ? (
						<Alert
							variant="danger"
							onClose={() => setshowalert(false)}
							dismissible
							style={{ width: "100%" }}
						>
							ERROR: Por favor, complete todos los campos.
						</Alert>
					) : null}

					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3, width: 1000, maxWidth: "100%" }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography component="h2" variant="h5">
									Producto: {producto.nombre}
								</Typography>
							</Grid>

							<Grid item xs={12}>
								<TextField
									id="outlined-select-currency"
									select
									label="Categoria"
									required
									value={categoriadenuncia}
									onChange={(e) => setcategoriadenuncia(e.target.value)}
									fullWidth
								>
									{categoriasdenunciaprueba.map((option) => (
										<MenuItem key={option} value={option}>
											{option}
										</MenuItem>
									))}
								</TextField>
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									multiline
									rows={9}
									id="comentario"
									label="Comentario"
									name="comentario"
									value={comentario}
									onChange={(e) => setcomentario(e.target.value)}
									type="text"
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							CREAR DENUNCIA
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
