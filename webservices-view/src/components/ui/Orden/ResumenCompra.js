import React from "react";
import Grid from "@mui/material/Grid";
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
				Domicilio: {ordenls.domicilio} <br />
				Medio de pago: {ordenls.mediopago} <br />
				Total: $ {ordenls.total.toFixed(2)}
			</Grid>
		</Grid>
	);
};

export default ResumenCompra;
