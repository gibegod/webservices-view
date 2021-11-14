import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router";
import Reclamo from "./Reclamo";
import Denuncia from "./Denuncia";

const MesaDeAyuda = () => {

	const [denunciaslist, setdenunciaslist] = useState([]);
	const [reclamoslist, setreclamoslist] = useState([]);

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
						<Reclamo key={reclamo.id} 
							reclamo={reclamo} />
					))}
				</Grid>
				<Grid item xs={12}>
					{denunciaslist.map((denuncia) => (
						<Denuncia key={denuncia.id} denuncia={denuncia} />
					))}
				</Grid>
			</Grid>
		</Container>
	);

};

export default MesaDeAyuda;