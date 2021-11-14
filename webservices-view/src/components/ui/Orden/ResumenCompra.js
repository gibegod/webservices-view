import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardProductoResumen from "./CardProductoResumen";

const ResumenCompra = (props) => {
	const { productosorden } = props;

	let ordenls = localStorage.getItem("orden");
	ordenls = JSON.parse(ordenls);

	return (
		<Grid container spacing={1}>
			<Grid item xs={6}>
				{productosorden.map((prod) => (
					<CardProductoResumen
						id={prod.id}
						nombre={prod.nombre}
						cantidad={prod.cantidad}
						imagen={prod.imagen}
						precio={prod.precio}
					/>
				))}
			</Grid>
			<Grid item xs={6}>
				<Typography variant="h6" gutterBottom component="div">
					<b>Domicilio:</b> {ordenls.domicilio.calle} {ordenls.domicilio.numero}{" "}
					- {ordenls.domicilio.localidad}
				</Typography>
				<Typography variant="h6" gutterBottom component="div">
					<b>Medio de pago:</b> {ordenls.mediopago.tipo} -{" "}
					{ordenls.mediopago.numero}
				</Typography>
				<Typography variant="h6" gutterBottom component="div">
					<b>Total:</b> $ {ordenls.total.toFixed(2)}{" "}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default ResumenCompra;
