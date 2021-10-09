import React, { useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import Alert from "react-bootstrap/Alert";

const theme = createTheme();

export default function NuevaTarjeta() {
	//States
  const [tipotarjeta, settipotarjeta] = useState("");
	const [numero, setnumero] = useState("");
	const [nombre, setnombre] = useState("");
	const [cvc, setcvc] = useState("");
	const [vencimiento, setvencimiento] = useState("");
	const [showalert, setshowalert] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();


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
						Nueva tarjeta
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
									id="outlined-select-currency"
									select
									label="Tipo"
									required
									value={tipotarjeta}
									onChange={(e) => settipotarjeta(e.target.value)}
									fullWidth
								>
									{["Debito", "Credito"].map((option) => (
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
									id="nombre"
									label="Nombre"
									name="nombre"
                  value={nombre}
									onChange={(e) => setnombre(e.target.value)}
									type="text"
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id="vencimiento"
									name="vencimiento"
                  value={vencimiento}
									onChange={(e) => setvencimiento(e.target.value)}
									type="month"
								/>
							</Grid>

							<Grid item xs={12} sm={6}>
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
