import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  useParams, useHistory
} from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const theme = createTheme();

export default function FormReclamo() {
	let history = useHistory();

	const usuarioSesion = localStorage.getItem("usuario");
	//Si el usuario no esta logueado no puede entrar a la pagina
	if (usuarioSesion === "" || usuarioSesion === null) {
		history.push("/signin");
	}


	//States
	const [comentario, setcomentario] = useState("");
	const [showalert, setshowalert] = useState(false);

  const { id } = useParams();

	const handleSubmit = (event) => {
		event.preventDefault();

		//Pasar a la api
		//Si hay un error mostrar en pantalla
		//Si no hay error pushear a pantalla principal
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="md">
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
						Nuevo reclamo
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
						sx={{ mt: 3, width: 1000, maxWidth: "100%" }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Typography component="h2" variant="h5">
									Compra: {id}
								</Typography>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									multiline
									rows={12}
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
							ENVIAR RECLAMO
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
