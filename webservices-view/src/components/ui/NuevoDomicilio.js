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

export default function NuevoDomicilio() {
	let history = useHistory();

	let usuarioSesion = localStorage.getItem("usuario");
	//Si el usuario no esta logueado no puede entrar a la pagina
	if (usuarioSesion === "" || usuarioSesion === undefined) {
		history.push("/signin");
	}

	//Transformo el texto en JSON
	usuarioSesion = JSON.parse(usuarioSesion);

	//States
  const [calle, setcalle] = useState("");
	const [numero, setnumero] = useState("");
  const [piso, setpiso] = useState("");
  const [departamento, setdepartamento] = useState("");
	const [localidad, setlocalidad] = useState("");
	const [provincia, setprovincia] = useState("");
	const [showalert, setshowalert] = useState(false);

	const handleSubmit = async (event) => {
		event.preventDefault();

		//Valido formulario
		if(calle.trim() === "" || numero.trim() === "" || localidad.trim() === "" || provincia.trim() === "") {
			setshowalert(true);
			return;
		}

    const data = {calle, numero, piso, departamento, localidad, provincia, pais: "Argentina", idUsuario: usuarioSesion.id}
    //Envio la info a la api
    const result = await axios.post("http://localhost:8083/usuario/domicilio", data);
    console.log(result.data);

		//Ir a MisDatos
		history.push('/misdatos');
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
						Nuevo domicilio
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
									id="calle"
									label="Calle"
									name="calle"
                  value={calle}
									onChange={(e) => setcalle(e.target.value)}
									type="text"
								/>
							</Grid>

							<Grid item xs={12} sm={4}>
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
									fullWidth
									id="piso"
									label="Piso"
									name="piso"
                  value={piso}
									onChange={(e) => setpiso(e.target.value)}
									type="text"
								/>
							</Grid>

              <Grid item xs={12} sm={4}>
								<TextField
									fullWidth
									id="departamento"
									label="Departamento"
									name="departamento"
                  value={departamento}
									onChange={(e) => setdepartamento(e.target.value)}
									type="text"
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="provincia"
									name="provincia"
                  label="Provincia"
                  value={provincia}
									onChange={(e) => setprovincia(e.target.value)}
									type="text"
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									name="localidad"
									label="Localidad"
									type="text"
									id="localidad"
									onChange={(e) => setlocalidad(e.target.value)}
                  value={localidad}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							AGREGAR DOMICILIO
						</Button>
						<Grid container justifyContent="flex-end">
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
