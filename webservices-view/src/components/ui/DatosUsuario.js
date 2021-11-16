import React, { useState, useEffect } from "react";
import { Container, TextField, Grid, Typography } from "@mui/material";
import Button from "react-bootstrap/Button";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import CardTarjeta from "./Cards/CardTarjeta";
import CardDomicilio from "./Cards/CardDomicilio";
import CardCuentaBancaria from "./Cards/CardCuentaBancaria";
import Spinner from "./Spinner";

const DatosUsuario = () => {
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
	const [apellido, setapellido] = useState("");
	const [usuario, setusuario] = useState("");
	const [tipousuario, settipousuario] = useState("");
	const [dni, setdni] = useState("");
	const [password, setpassword] = useState("");
	const [telefono, settelefono] = useState("");
	const [domicilios, setdomicilios] = useState([]);
	const [tarjetas, settarjetas] = useState([]);
	const [cuentasbancarias, setcuentasbancarias] = useState([]);
	const [showalert, setshowalert] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		//Validacion
		if (
			nombre.trim() === "" ||
			apellido.trim() === "" ||
			usuario.trim() === "" ||
			dni.trim() === "" ||
			password.trim() === ""
		) {
			setshowalert(true);
			return;
		}

		const data = {
			id: usuarioSesion.id,
			usuario: usuario,
			contrasenia: password,
			dni: dni.toString(),
			nombre: nombre,
			apellido: apellido,
			tipoUsuario: { tipo: tipousuario },
			telefono: telefono,
		};

		//Le enviamos los datos a la API
		const result = await axios.post(
			"http://localhost:8083/usuario/update",
			data
		);
		console.log(result);

		//Si no esta ok tirar error
		if (result.data !== "OK") {
			setshowalert(true);
			return;
		}

		//Si esta ok actualizar los datos en el localStorage
		const usuarioAux = {
			apellido,
			id: usuarioSesion.id,
			nombre,
			tipousuario: usuarioSesion.tipousuario,
			usuario,
		};

		localStorage.setItem("usuario", JSON.stringify(usuarioAux));
	};

	const fetchApi = async (usuario) => {
		if (usuario.tipousuario.tipo === "Comprador") {
			const result = await axios.get(
				`http://localhost:8083/usuario/${usuario.usuario}`
			);
			console.log(result.data);

			setnombre(result.data.nombre);
			setapellido(result.data.apellido);
			setusuario(result.data.usuario);
			settipousuario(result.data.tipoUsuario.tipo);
			setdni(result.data.dni);
			setpassword(result.data.contrasenia);
			settelefono(result.data.telefono);
			setdomicilios(result.data.domicilios);
			settarjetas(result.data.tarjetas);
		} else {
			const result = await axios.get(
				`http://localhost:8084/usuario/${usuario.usuario}`
			);
			console.log(result.data);

			setnombre(result.data.nombre);
			setapellido(result.data.apellido);
			setusuario(result.data.usuario);
			settipousuario(usuario.tipousuario.tipo);
			setdni(result.data.dni);
			setpassword(result.data.contrasenia);
			settelefono(result.data.telefono);
			setdomicilios(result.data.domicilios);
			setcuentasbancarias(result.data.cuentasBancarias);
		}
	};

	useEffect(() => {
		fetchApi(usuarioSesion);
	}, [usuarioSesion.usuario]);

	return dni === "" ? (
		<Spinner />
	) : (
		<Container component="main" maxWidth="sm">
			<Box
				sx={{
					marginTop: 8,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
				component="form"
				noValidate
				onSubmit={handleSubmit}
			>
				<Grid container spacing={4}>
					{showalert ? (
						<Alert
							variant="danger"
							onClose={() => setshowalert(false)}
							dismissible
							style={{ width: "100%" }}
						>
							ERROR!
						</Alert>
					) : null}
					<Grid item xs={12} sm={4}>
						<TextField
							id="nombre"
							fullWidth
							label="Nombre"
							variant="standard"
							InputLabelProps={{
								shrink: true,
							}}
							value={nombre}
							onChange={(e) => setnombre(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={4}>
						<TextField
							id="apellido"
							fullWidth
							label="Apellido"
							variant="standard"
							InputLabelProps={{
								shrink: true,
							}}
							value={apellido}
							onChange={(e) => setapellido(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={4}>
						<TextField
							id="dni"
							fullWidth
							label="DNI"
							variant="standard"
							InputLabelProps={{
								shrink: true,
							}}
							value={dni}
							onChange={(e) => setdni(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							id="usuario"
							fullWidth
							label="Usuario"
							variant="standard"
							InputLabelProps={{
								shrink: true,
							}}
							value={usuario}
							onChange={(e) => setusuario(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12} sm={6}>
						<TextField
							id="tipousuario"
							fullWidth
							label="Tipo"
							variant="standard"
							InputLabelProps={{
								shrink: true,
							}}
							InputProps={{
								readOnly: true,
							}}
							value={tipousuario}
							onChange={(e) => settipousuario(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							id="telefono"
							fullWidth
							label="Telefono"
							variant="standard"
							InputLabelProps={{
								shrink: true,
							}}
							value={telefono}
							onChange={(e) => settelefono(e.target.value)}
						/>
					</Grid>

					<Grid item xs={12}>
						<TextField
							id="password"
							fullWidth
							label="Contraseña"
							type="password"
							variant="standard"
							InputLabelProps={{
								shrink: true,
							}}
							value={password}
							onChange={(e) => setpassword(e.target.value)}
						/>
					</Grid>

					<Grid item>
						<Button variant="outline-primary" type="submit">
							EDITAR DATOS
						</Button>
					</Grid>
				</Grid>
			</Box>

			<Grid container>
				{tipousuario === "Comprador" ? (
					<>
						<Grid item xs={12} className="pb-2 pt-4">
							<Typography component="div">
								<Box
									sx={{
										textAlign: "center",
										m: 1,
										fontWeight: "bold",
										fontSize: 30,
									}}
								>
									Tarjetas
								</Box>
							</Typography>
							{tarjetas.map((tarj) => (
								<CardTarjeta key={tarj.id} tarjeta={tarj} />
							))}
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								variant="outline-primary"
								onClick={(e) => history.push("/nuevatarjeta")}
							>
								AGREGAR TARJETA
							</Button>
						</Grid>
					</>
				) : (
					<>
						<Grid item xs={12} className="pb-2 pt-4">
							<Typography component="div">
								<Box
									sx={{
										textAlign: "center",
										m: 1,
										fontWeight: "bold",
										fontSize: 30,
									}}
								>
									Cuentas Bancarias
								</Box>
							</Typography>
							{cuentasbancarias.map((cuenta) => (
								<CardCuentaBancaria key={cuenta.id} cuentabancaria={cuenta} />
							))}
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								variant="outline-primary"
								onClick={(e) => history.push("/nuevacuentabancaria")}
							>
								AGREGAR CUENTA BANCARIA
							</Button>
						</Grid>
					</>
				)}

				<Grid item xs={12} className="pb-2 pt-4">
					<Typography component="div">
						<Box
							sx={{
								textAlign: "center",
								m: 1,
								fontWeight: "bold",
								fontSize: 30,
							}}
						>
							Domicilios
						</Box>
					</Typography>
					{domicilios.map((d) => (
						<CardDomicilio
							key={d.id}
							calle={d.calle}
							numero={d.numero}
							departamento={d.departamento}
							piso={d.piso}
							localidad={d.localidad}
							provincia={d.provincia}
						/>
					))}
				</Grid>
				<Grid item xs={12} sm={6}>
					<Button
						variant="outline-primary"
						className="mb-2"
						onClick={(e) => history.push("/nuevodomicilio")}
					>
						AGREGAR DOMICILIO
					</Button>
				</Grid>
			</Grid>
		</Container>
	);
};

export default DatosUsuario;
