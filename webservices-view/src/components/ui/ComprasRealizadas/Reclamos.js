import React from "react";
import { Container, TextField, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import CardCompra from "./CardCompra";

const reclamosprueba = [
	{
		id: 1,
		comentarioComprador:
			"In lobortis nisi nec elementum imperdiet. Ut luctus ante eget lectus elementum, vitae euismod mauris laoreet. Sed maximus imperdiet dictum. Aliquam erat volutpat. Aenean lobortis vel mi in luctus. Maecenas tincidunt ligula varius sapien iaculis, vitae malesuada magna finibus. Integer scelerisque massa dui, molestie sollicitudin velit lacinia quis. Nulla facilisi. Aenean tincidunt sem ac lorem gravida, malesuada sollicitudin nulla congue. Aenean quis mollis tellus. Morbi euismod lacus et ipsum bibendum tristique. Mauris feugiat odio ac diam varius, vitae blandit urna lacinia. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Morbi ac felis ultrices, cursus turpis at, eleifend felis. Donec vel purus sed diam porttitor rhoncus.Etiam lacus libero, pellentesque sed porta nec, elementum id erat. Vestibulum feugiat tempus mattis. Aliquam id eros commodo, auctor mauris vitae, iaculis orci. Proin venenatis quam in purus imperdiet sagittis. In ac mauris ullamcorper mauris fringilla pellentesque vel quis enim. Aliquam vulputate congue aliquam. Nulla placerat ultrices ex, non malesuada arcu. Nunc vitae fermentum leo, nec tempor turpis. Donec pretium hendrerit tempor. Donec nec quam ac erat consectetur dignissim quis efficitur dui. Cras finibus, lacus a sollicitudin congue, mauris leo ultrices lacus, nec auctor nunc ante at risus. Nunc tempus rhoncus urna, at fermentum diam fringilla sed. Mauris sollicitudin tincidunt iaculis.",
		comentarioResolucion: null,
		estado: "En proceso",
		pedido: 1,
	},
	{
		id: 2,
		comentarioComprador:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta mattis erat, ac rhoncus sem vestibulum nec. Nulla fermentum nibh quam, vel bibendum leo varius id. Aenean placerat diam eu diam dapibus mollis. Curabitur nibh leo, congue auctor rhoncus id, pharetra eu quam. Vestibulum lobortis eget orci in commodo. Pellentesque vestibulum diam quis arcu dictum, vel tempus lorem mollis. Donec ultricies nisl sed massa consequat, vel lacinia lorem ultrices. In faucibus purus ut dui molestie vestibulum. Donec maximus fermentum lorem, sit amet molestie diam congue et. Phasellus sollicitudin rutrum est, ut bibendum arcu sodales quis. Vestibulum purus diam, ornare nec velit dictum, ornare consectetur neque.",
		comentarioResolucion:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porta mattis erat, ac rhoncus sem vestibulum nec. Nulla fermentum nibh quam, vel bibendum leo varius id. Aenean placerat diam eu diam dapibus mollis. Curabitur nibh leo, congue auctor rhoncus id, pharetra eu quam. Vestibulum lobortis eget orci in commodo. Pellentesque vestibulum diam quis arcu dictum, vel tempus lorem mollis. Donec ultricies nisl sed massa consequat, vel lacinia lorem ultrices. In faucibus purus ut dui molestie vestibulum. Donec maximus fermentum lorem, sit amet molestie diam congue et. Phasellus sollicitudin rutrum est, ut bibendum arcu sodales quis. Vestibulum purus diam, ornare nec velit dictum, ornare consectetur neque.",
		estado: "Resuelto",
		pedido: 2,
	},
];

const Reclamos = () => {
	let history = useHistory();

	const usuarioSesion = localStorage.getItem("usuario");
	//Si el usuario no esta logueado no puede entrar a la pagina
	if (usuarioSesion === "" || usuarioSesion === null) {
		history.push("/signin");
	}

	return (
		<Container component="main" maxWidth="md">
			<Grid container spacing={4}>
				<Grid item xs={12}>
					<Typography component="h1" variant="h5">
						Mis reclamos
					</Typography>
					{reclamosprueba.map((reclamo) => (
						<>
							<h3>Reclamo {reclamo.id}</h3>
							<h4>Compra asociada: {reclamo.pedido}</h4>
							<h4>Estado: {reclamo.estado}</h4>
							<p>Comentario: {reclamo.comentarioComprador}</p>
							{reclamo.comentarioResolucion === null ? null : (
								<p>Resolucion: {reclamo.comentarioResolucion}</p>
							)}
						</>
					))}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Reclamos;
