import React from "react";
import Grid from "@mui/material/Grid";
import CardProductoResumen from "./CardProductoResumen";

const ResumenCompra = (props) => {
  const {productoactual} = props;

  let ordenls = localStorage.getItem("orden");
  ordenls = JSON.parse(ordenls);

	return (
		<Grid container spacing={1}>
			<Grid item xs={6}>
        <CardProductoResumen
          id={productoactual.id}
          nombre={productoactual.nombre}
          cantidad={productoactual.cantidad}
          imagen={productoactual.imagen}
          precio={productoactual.precio}
        />
      </Grid>
			<Grid item xs={6}>
        Domicilio: {ordenls.domicilio} <br/>
        Medio de pago: {ordenls.mediopago} <br/>
        Total: $ {ordenls.total.toFixed(2)}
      </Grid>
		</Grid>
	);
};

export default ResumenCompra;
