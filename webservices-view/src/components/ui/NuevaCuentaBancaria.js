import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "react-bootstrap/Alert";
import { useHistory } from "react-router-dom";

const theme = createTheme();

export default function NuevaCuentaBancaria() {
	let history = useHistory();

	let usuarioSesion = localStorage.getItem("usuario");
	//Si el usuario no esta logueado no puede entrar a la pagina
	if (usuarioSesion === "" || usuarioSesion === undefined) {
		history.push("/signin");
	}




	//States
	const [cvu, setcvu] = useState("");
	const [dni, setdni] = useState("");
	const [banco, setbanco] = useState("");
	const [showalert, setshowalert] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		// const data = {user: usuario, pass: password}
		// //Envio la info a la api
		// const loguearse = await axios.post("http://localhost:8083/usuario/tarjeta", data);
		// console.log(loguearse.data);

		//Pasar a la api y validar
		//Si hay un error mostrar en pantalla
		//Si no hay error pushear a pantalla principal
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="sm">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Typography component="h1" variant="h5">
						Nueva cuenta bancaria
					</Typography>

					{showalert ? (
						<Alert
							variant="danger"
							onClose={() => setshowalert(false)}
							dismissible
							style={{ width: "100%" }}
						>
							This is a danger alert—check it out!
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
									id="banco"
									label="Banco"
									name="banco"
									value={banco}
									onChange={(e) => setbanco(e.target.value)}
									type="text"
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									name="CVU"
									required
									fullWidth
									id="CVU"
									label="CVU"
									autoFocus
									value={cvu}
									onChange={(e) => setcvu(e.target.value)}
									type="number"
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="dni"
									label="DNI"
									type="text"
									id="dni"
									onChange={(e) => setdni(e.target.value)}
									value={dni}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							AGREGAR CUENTA BANCARIA
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
