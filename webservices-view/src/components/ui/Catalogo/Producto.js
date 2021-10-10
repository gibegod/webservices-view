import React, { useState, useEffect } from "react";
import { Container, Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const productoprueba = {
	id: 1,
	nombre: "Calcetines",
	descripcion:
		"asdasd asd as fas d asd asd as das sdas d asf as fas d asd sa das d asd as",
	imagen:
		"https://www.brildor.com/media/catalog/product/cache/21d516047c3b0f7c4a4c397e20cf92ab/c/a/calcetines-d3.jpg",
	precio: 12.3,
	stock: 2,
};

const stockdisponible = `Stock disponible: ${productoprueba.stock}`;

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 400,
		flexGrow: 1,
	},
	header: {
		display: "flex",
		alignItems: "center",
		height: 50,
		paddingLeft: theme.spacing(4),
		backgroundColor: theme.palette.background.default,
	},
	img: {
		height: 255,
		display: "block",
		maxWidth: 600,
		overflow: "hidden",
		width: "auto",
		margin: "auto",
	},
}));

const Producto = () => {
	const classes = useStyles();
	const history = useHistory();

	const role = localStorage.getItem("role");

	//States
	const [producto, setproducto] = useState(productoprueba);
	const [cantidad, setcantidad] = useState(1);

	//Parametro que llega desde la url
	let { idproduct } = useParams();

	const imagesCard = {
		label: producto.nombre,
		imgPath: producto.imagen,
	};

	const handleClickCarrito = (type) => {
		let carritolocalstorage = localStorage.getItem("carrito");

		if (
			carritolocalstorage === null ||
			carritolocalstorage === undefined ||
			carritolocalstorage === "[]"
		) {
			producto.cantidad = cantidad;
			localStorage.setItem("carrito", JSON.stringify([producto]));
		} else {

			carritolocalstorage = JSON.parse(carritolocalstorage);
			//Mismo producto que esta en el carrito
			const auxprod = carritolocalstorage.filter(
				(prod) =>
					prod.id === producto.id
			)[0];

			if (auxprod === undefined) {
				producto.cantidad = cantidad;
				carritolocalstorage.push(producto);
				localStorage.setItem("carrito", JSON.stringify(carritolocalstorage));
				if (type === "carrito") alert("Producto agregado al carrito");

			} else {
				//Si el producto tiene el mismo sku que el producto en carrito
				producto.cantidad = auxprod.cantidad + cantidad;

				//Filtro el producto exactamente igual del carrito
				carritolocalstorage = carritolocalstorage.filter(
					(prod) =>
						prod.id !== producto.id
				);

				carritolocalstorage.push(producto);
				localStorage.setItem("carrito", JSON.stringify(carritolocalstorage));
				if (type === "carrito") alert("Producto agregado al carrito");
			}
		}
		if (type === "compra") history.push("/carrito");
	};

	// const handleDeleteProduct = (e, idproduct) => {
	//   apiAxios
	//     .post("product/deleteProduct", idproduct, {
	//       params: { id: idproduct },
	//     })
	//     .then(({ data }) => {
	//       console.log(data);
	//     })
	//     .catch((error) => console.log(error));

	//   history.push("/catalogue");
	// };

	return (
		<>
			<Container maxWidth="md" style={{ marginTop: "2%" }}>
				<Grid container justify="center" spacing={0}>
					<Grid item xs={6}>
						<Paper style={{ padding: 20, height: 500 }}>
							<div className={classes.root}>
								<img
									className={classes.img}
									src={imagesCard.imgPath}
									alt={imagesCard.label}
								/>
							</div>
							<Typography variant="body2" style={{ marginTop: "5%" }}>
								{producto.descripcion}
							</Typography>
						</Paper>
					</Grid>

					<Grid item xs={4}>
						<Paper elevantion={3} style={{ height: 500 }}>
							{role === "ROLE_ADMIN" ? (
								<Grid container justify="flex-end">
									<EditIcon
										onClick={(e) => {
											e.preventDefault();
											history.push("/admin/products/" + idproduct);
										}}
										style={{ cursor: "pointer" }}
									/>
									<DeleteIcon
										//onClick={(e) => handleDeleteProduct(e, idproduct)}
										style={{ cursor: "pointer" }}
									/>
								</Grid>
							) : null}
							<Grid container>
								<Typography variant="h4" align="center" style={{ padding: 20 }}>
									{producto.nombre}
								</Typography>
							</Grid>

							<Grid style={{ marginLeft: "4%" }}>
								<Typography variant="h4">${producto.precio}</Typography>
							</Grid>

							<Grid style={{ marginBottom: "10%", marginLeft: "4%" }}>
								<Grid item xs={5}>
									<TextField
										required
										fullWidth
										id="cantidad"
										label="Cantidad"
										name="cantidad"
										value={cantidad}
										onChange={(e) => setcantidad(e.target.value)}
										type="number"
										helperText={stockdisponible}
									/>
								</Grid>
							</Grid>

							<Grid container justify="center" spacing={4}>
								<Button
									color="primary"
									variant="contained"
									style={{ padding: 10, width: "80%", marginBottom: 10 }}
									onClick={(e) => handleClickCarrito("compra")}
								>
									Comprar
								</Button>
								<Button
									color="primary"
									variant="contained"
									fullWidth
									style={{ padding: 10, width: "80%" }}
									onClick={(e) => handleClickCarrito("carrito")}
								>
									Agregar al carrito
								</Button>
							</Grid>
						</Paper>
					</Grid>
				</Grid>
			</Container>
		</>
	);
};

export default Producto;
