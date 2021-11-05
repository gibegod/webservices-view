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
import axios from 'axios';

const theme = createTheme();

export default function NuevaTarjeta() {
	let history = useHistory();

	let usuarioSesion = localStorage.getItem("usuario");
	//Si el usuario no esta logueado no puede entrar a la pagina
	if (usuarioSesion === "" || usuarioSesion === undefined) {
		history.push("/signin");
	}

	//Transformo el texto en JSON
	usuarioSesion = JSON.parse(usuarioSesion);

	//States
	const [numero, setnumero] = useState("");
	const [cvc, setcvc] = useState("");
	const [showalert, setshowalert] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		//Valido formulario
		if(cvc.trim() === "" || numero.trim() === "") {
			setshowalert(true);
			return;
		}

    // const data = {numero, cvc, idUsuario: usuarioSesion.id}
    // //Envio la info a la api
    // const result = await axios.post("http://localhost:8083/usuario/tarjeta", data);
    // console.log(result.data);

		// //Ir a MisDatos
		// history.push('/misdatos');
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
						Nueva tarjeta
					</Typography>

					{showalert ? (
						<Alert
							variant="danger"
							onClose={() => setshowalert(false)}
							dismissible
							style={{ width: "100%" }}
						>
							ERROR: Complete todos los campos
						</Alert>
					) : null}

					<Box
						component="form"
						noValidate
						onSubmit={handleSubmit}
						sx={{ mt: 3 }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={8}>
								<TextField
									name="numero"
									required
									fullWidth
									id="numero"
									label="Numero"
									autoFocus
                  value={numero}
									onChange={(e) => setnumero(e.target.value)}
									type="number"
								/>
							</Grid>

							<Grid item xs={12} sm={4}>
								<TextField
									required
									fullWidth
									name="cvc"
									label="CVC"
									type="number"
									id="cvc"
									onChange={(e) => setcvc(e.target.value)}
                  value={cvc}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							AGREGAR TARJETA
						</Button>
						<Grid container justifyContent="flex-end">
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
