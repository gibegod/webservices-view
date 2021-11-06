import React from "react";
import { Container, TextField, Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { useHistory } from "react-router-dom";
import CardCompra from "./CardCompra";

const comprasprueba = [
	{
		id: 1,
		usuario: null,
		total: 17.3,
		domicilio: 2,
		mediopago: 2,
		idvendedor: 1,
		productos: [
			{
				id: 1,
				nombre: "Calcetines",
				descripcion:
					"asdasd asd as fas d asd asd as das sdas d asf as fas d asd sa das d asd as",
				imagen:
					"https://www.brildor.com/media/catalog/product/cache/21d516047c3b0f7c4a4c397e20cf92ab/c/a/calcetines-d3.jpg",
				precio: 12.3,
				stock: 2,
				mediosdepago: ["Credito", "Debito"],
				idvendedor: 1,
				cantidad: 1,
			},
			{
				id: 3,
				nombre: "Calcetines v3",
				descripcion:
					"asdasd asd as fas d asd asd as das sdas d asf as fas d asd sa das d asd as",
				imagen:
					"https://www.brildor.com/media/catalog/product/cache/21d516047c3b0f7c4a4c397e20cf92ab/c/a/calcetines-d3.jpg",
				precio: 5,
				stock: 1,
				mediosdepago: ["Credito"],
				idvendedor: 1,
				cantidad: 1,
			},
		],
	},
	{
		id: 2,
		usuario: null,
		total: 5,
		domicilio: 1,
		mediopago: 3,
		idvendedor: 2,
		productos: [
			{
				id: 2,
				nombre: "Calcetines v2",
				descripcion:
					"asdasd asd as fas d asd asd as das sdas d asf as fas d asd sa das d asd as",
				imagen:
					"https://www.brildor.com/media/catalog/product/cache/21d516047c3b0f7c4a4c397e20cf92ab/c/a/calcetines-d3.jpg",
				precio: 5,
				stock: 1,
				mediosdepago: ["Credito"],
				idvendedor: 2,
				cantidad: 1,
			},
		],
	},
];

const Compras = () => {
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
						Mis compras
					</Typography>
					{comprasprueba.map((compra) => (
						<>
							<h3>Compra {compra.id}</h3>
							<h4>Estado: </h4>
              <h4>Fecha: </h4>
							{compra.productos.map((prod) => (
								<CardCompra
									key={prod.id}
									id={prod.id}
									nombre={prod.nombre}
									precio={prod.precio}
									imagen={prod.imagen}
									cantidad={prod.cantidad}
								/>
							))}
                <h4>Total: $ {compra.total} </h4>

							<Grid item xs={12} sm={6}>
								<Button variant="outlined" onClick={(e) => history.push(`/nuevoreclamo/${compra.id}`)}>Iniciar reclamo</Button>
                <Button variant="outlined" color="error" >Cancelar compra</Button>
							</Grid>
						</>
					))}
				</Grid>
			</Grid>
		</Container>
	);
};

export default Compras;
