import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import { useHistory } from "react-router";

const MesaDeAyuda = () => {

	const [denunciaslist, setdenunciaslist] = useState([]);
	const [reclamoslist, setreclamoslist] = useState([]);
	const [estado, setestado] = useState(); 

	const getDesdeApi = async () => {
		const resultDenuncias = await axios.get("http://localhost:9000/api/v1.0/denuncias/");
		setdenunciaslist(resultDenuncias.data);

		const resultReclamos = await axios.get("http://localhost:9000/api/v1.0/reclamos/");
		setreclamoslist(resultReclamos.data);

		console.log(resultDenuncias.data);
		console.log(resultReclamos.data);
	};

	useEffect(() => {
		getDesdeApi();
	}, []);

	const getAtenderReclamo = async (id ) => {
		console.log(estado);
		axios.put(
			"http://localhost:9000/api/v1.0/reclamos/atender",
			{
			  idReclamo: id,
			  estado: estado
			},
			{
			  headers: {
			  },
			}
		  );
	}

	const getAtenderDenuncia = async (id ) => {
		console.log(estado);
		axios.put(
			"http://localhost:9000/api/v1.0/denuncias/atender",
			{
			  idDenuncia: id,
			  estado: estado
			},
			{
			  headers: {
			  },
			}
		  );
	}

	const handleRechazoReclamo = ( id ) => {
		setestado(false);
		getAtenderReclamo(id);
	}

	const handleAceptarReclamo = (id) => {
		setestado(true);
		getAtenderReclamo(id);
	}

	const handleRechazoDenuncia = (id) => {
		setestado(false);
		getAtenderDenuncia(id);
	}

	const handleAceptarDenuncia = (id) => {
		setestado(true);
		getAtenderDenuncia(id);
	}

    const history = useHistory();

    //hay que validar tambien que el usuario sea de helpdesk
    const usernameSesion = localStorage.getItem("usuario");
	//Si el usuario no esta logueado no puede entrar a la pagina
	if (usernameSesion === "" && usernameSesion === null) {
		history.push("/signin");
	}

    return (
		<Container component="main" maxWidth="md">
			<Grid container spacing={4}>
				<Grid item xs={12}>
					{reclamoslist.map((reclamo) => (
						<>
							<h3>Reclamo HD{reclamo.id}</h3>
							<h4>Compra asociada: {reclamo.id_venta}</h4>
							<h4>Estado: {reclamo.estado}</h4>
							<p>Comentario: {reclamo.comentario_comprador}</p>
							{reclamo.comentario_resolucion === null ? null : (
								<p>Resolucion: {reclamo.comentario_resolucion}</p>
							)}
							<Button
							variant="contained"
							style={{
								backgroundColor: "green",
								color: "white"
							}}
							size="large"
							onClick={(e) => handleAceptarReclamo( reclamo.id )}
							>
								<Typography variant="button" display="block">
									Hacer devolucion
								</Typography>
							</Button>
							<Button
							variant="contained"
							style={{
								backgroundColor: "red",
								color: "white"
							}}
							size="large"
							onClick={(e) => handleRechazoReclamo( reclamo.id )}
							>
								<Typography variant="button" display="block">
									Rechazar
								</Typography>
							</Button>
						</>
					))}
				</Grid>
				<Grid item xs={12}>
					{denunciaslist.map((denuncia) => (
						<>
							<h3>Denuncia HD{denuncia.id}</h3>
							<h4>Producto asociado: {denuncia.pedido}</h4>
							<h4>Estado: {denuncia.estado}</h4>
							<p>Comentario: {denuncia.comentarioComprador}</p>
							{denuncia.comentarioResolucion === null ? null : (
								<p>Resolucion: {denuncia.comentarioResolucion}</p>
							)}
							<Button
							variant="contained"
							style={{
								backgroundColor: "green",
								color: "white"
							}}
							size="large"
							onClick={(e) => handleAceptarDenuncia( denuncia.id )}
							>
								<Typography variant="button" display="block">
									Eliminar publicacion
								</Typography>
							</Button>
							<Button
							variant="contained"
							style={{
								backgroundColor: "red",
								color: "white"
							}}
							size="large"
							onClick={(e) => handleRechazoDenuncia( denuncia.id )}
							>
								<Typography variant="button" display="block">
									Rechazar
								</Typography>
							</Button>
						</>
					))}
				</Grid>
			</Grid>
		</Container>
	);

};

export default MesaDeAyuda;