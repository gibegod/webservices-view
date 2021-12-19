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
import axios from "axios";
import { useHistory } from "react-router-dom";

const theme = createTheme();

export default function NuevaCuentaBancaria() {
	let history = useHistory();

	let usuarioSesion = localStorage.getItem("usuario");
	//Si el usuario no esta logueado no puede entrar a la pagina
	if (usuarioSesion === "" || usuarioSesion === undefined) {
		history.push("/signin");
	}

	usuarioSesion = JSON.parse(usuarioSesion);

	//States
	const [cbu, setcbu] = useState("");
	const [showalert, setshowalert] = useState(false);
	const [mensajealerta, setmensajealerta] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		if(cbu.trim() === ""){
			setshowalert(true);
			setmensajealerta("ERROR: Por favor complete todos los campos.");
			return;
		}

		//Envio la info a la api
		const data = {cbu, idUsuario: usuarioSesion.id}

		const result = await axios.post("http://localhost:8084/usuario/cuentaBancaria", data);
		console.log(result.data);

		//Validar
		if(result.data !== "OK"){
			//Si hay un error mostrar en pantalla
			setshowalert(true);
			setmensajealerta(result.data);
			return;
		}

		//Si no hay error pushear a mis datos
		history.push("/misdatos");
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
						Nueva cuenta bancaria
					</Typography>

					{showalert ? (
						<Alert
							variant="danger"
							onClose={() => setshowalert(false)}
							dismissible
							style={{ width: "100%" }}
						>
							{mensajealerta}
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
									name="cbu"
									required
									fullWidth
									id="cbu"
									label="CBU"
									autoFocus
									value={cbu}
									onChange={(e) => setcbu(e.target.value)}
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
							AGREGAR CUENTA BANCARIA
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
