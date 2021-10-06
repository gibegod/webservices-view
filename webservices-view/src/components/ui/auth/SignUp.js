import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "react-bootstrap/Alert";

const theme = createTheme();

export default function SignUp() {
	//States
	const [nombre, setnombre] = useState("");
	const [apellido, setapellido] = useState("");
	const [dni, setdni] = useState("");
	const [usuario, setusuario] = useState("");
	const [password, setpassword] = useState("");
	const [showalert, setshowalert] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();

		console.log(nombre, apellido, dni, usuario, password);

    //Pasar a la api y validar
    //Si hay un error mostrar en pantalla
    //Si no hay error pushear a pantalla principal
	};

	return (
		<ThemeProvider theme={theme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component="h1" variant="h5">
						Registrarse
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
							<Grid item xs={12} sm={6}>
								<TextField
									name="nombre"
									required
									fullWidth
									id="nombre"
									label="Nombre"
									autoFocus
									onChange={(e) => setnombre(e.target.value)}
									type="text"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="apellido"
									label="Apellido"
									name="apellido"
									onChange={(e) => setapellido(e.target.value)}
									type="text"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="dni"
									label="DNI"
									name="dni"
									onChange={(e) => setdni(e.target.value)}
									type="number"
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="usuario"
									label="Usuario"
									name="usuario"
									onChange={(e) => setusuario(e.target.value)}
									type="text"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Contraseña"
									type="password"
									id="password"
									onChange={(e) => setpassword(e.target.value)}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							REGISTRATE
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/signin" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
