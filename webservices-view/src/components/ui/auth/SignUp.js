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
import MenuItem from "@mui/material/MenuItem";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { useHistory } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
	let history = useHistory();

	const usuarioSesion = localStorage.getItem("usuario");
	//Si el usuario esta logueado no puede entrar a la pagina
	if (usuarioSesion !== "" && usuarioSesion !== null) {
		history.push("/");
	} 

	//States
	const [nombre, setnombre] = useState("");
	const [apellido, setapellido] = useState("");
	const [dni, setdni] = useState("");
	const [usuario, setusuario] = useState("");
	const [tipousuario, settipousuario] = useState("");
	const [password, setpassword] = useState("");
	const [showalert, setshowalert] = useState(false);
	const [mensajealert, setmensajealert] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();

		const user = {
			usuario: usuario,
			contrasenia: password,
			dni: dni.toString(),
			nombre: nombre,
			apellido: apellido,
			tipoUsuario: {tipo: tipousuario},
		};

		//Envio los datos a la api
		const register = await axios.post(
			"http://localhost:8083/usuario/register",
			user
		);
		console.log(register.data);

		if (register.data === "OK") {
			//Si no hay error guardar el user en localstorage y pushear a pantalla principal

			const userbd = await axios.get(`http://localhost:8083/usuario/${usuario}`);
      console.log(userbd);

			localStorage.setItem(
				"usuario",
				JSON.stringify({
					usuario: userbd.data.usuario,
          nombre: userbd.data.nombre,
          apellido: userbd.data.apellido,
          id: userbd.data.id,
          tipousuario: userbd.data.tipoUsuario,
				})
			);

			setshowalert(false);
			setmensajealert("");

			history.push("/");
		} else {
			//Si hay un error mostrar en pantalla
			setshowalert(true);
			setmensajealert(register.data);
		}
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
							{mensajealert}
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
									value={nombre}
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
									value={apellido}
									onChange={(e) => setapellido(e.target.value)}
									type="text"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="dni"
									label="DNI"
									name="dni"
									value={dni}
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
									value={usuario}
									onChange={(e) => setusuario(e.target.value)}
									type="text"
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									id="outlined-select-currency"
									select
									label="Tipo"
									required
									value={tipousuario}
									onChange={(e) => settipousuario(e.target.value)}
									fullWidth
								>
									{["Comprador", "Vendedor"].map((option) => (
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
									name="password"
									label="Contraseña"
									type="password"
									id="password"
									value={password}
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
