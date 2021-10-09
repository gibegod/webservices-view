import React, { useState, useEffect } from "react";
import { Container, Grid, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddCommentIcon from "@mui/icons-material/AddComment";
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
};

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
	const [activeStep, setActiveStep] = useState(0);
	const [product, setproduct] = useState(productoprueba);
	const [color, setColor] = useState("");
	const [size, setSize] = useState("");
	const [show, setshow] = useState(false);
	const [disabled, setdisabled] = useState(true); //Disabled select del talle
	const [open, setOpen] = useState(false);

	//Parametro que llega desde la url
	let { idproduct } = useParams();

	const imagesCard = [
		{
			label: product.nombre,
			imgPath: product.imagen,
		},
		{
			label: product.nombre,
			imgPath: product.video,
		},
	];

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClickCarrito = (type) => {
		if (color === "" || size === "") {
			alert("Los espacios de color y talle no deben quedar vacios");
		} else {
			let cartlocalstorage = localStorage.getItem("cart");

			//Pongo el atributo seleccionado en el objeto
			product.atributoselecc = product.atributos.filter(
				(atrib) => atrib.color === color && atrib.talle === size
			);
			if (
				cartlocalstorage === null ||
				cartlocalstorage === undefined ||
				cartlocalstorage === "[]"
			) {
				product.cant = 1;
				localStorage.setItem("cart", JSON.stringify([product]));
			} else {
				cartlocalstorage = JSON.parse(cartlocalstorage);
				//Mismo producto con el mismo sku que esta en el carrito
				const auxprod = cartlocalstorage.filter(
					(prod) =>
						prod.idProducto === product.idProducto &&
						prod.atributoselecc[0].sku === product.atributoselecc[0].sku
				)[0];

				if (auxprod === undefined) {
					product.cant = 1;
					cartlocalstorage.push(product);
					localStorage.setItem("cart", JSON.stringify(cartlocalstorage));
					if (type === "cart") alert("Producto agregado al carrito");
				} else {
					//Si el producto tiene el mismo sku que el producto en carrito
					product.cant = auxprod.cant + 1;

					//Filtro el producto exactamente igual del carrito
					cartlocalstorage = cartlocalstorage.filter(
						(prod) =>
							prod.idProducto != product.idProducto &&
							prod.atributoselecc[0].sku != product.atributoselecc[0].sku
					);

					cartlocalstorage.push(product);
					localStorage.setItem("cart", JSON.stringify(cartlocalstorage));
					if (type === "cart") alert("Producto agregado al carrito");
				}
			}
			if (type === "buy") history.push("/cart");
		}
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
			<Container maxWidth="md" spacing={4} style={{ marginTop: "2%" }}>
				<Grid container justify="center" spacing={6}>
					<Grid item xs={6}>
						<Paper elevantion={3} style={{ padding: 20, height: 500 }}>
							<div className={classes.root}>
								<img
									className={classes.img}
									src={imagesCard[0].imgPath}
									alt={imagesCard[0].label}
								/>
							</div>
							<Typography variant="body2" style={{ marginTop: "5%" }}>
								{product.descripcion}
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
							<Grid container justify="center">
								<Typography variant="h4" align="center" style={{ padding: 20 }}>
									{product.nombre}
								</Typography>
							</Grid>
							<Grid container>
								<Tooltip title={"Añadir comentario"}>
									<AddCommentIcon
										style={{ cursor: "pointer", marginLeft: "82%" }}
										onClick={handleClickOpen}
									/>
								</Tooltip>
							</Grid>
							<Grid
								container
								direction="row"
								justify="flex-start"
								alignItems="flex-start"
								style={{ marginLeft: "6%" }}
							></Grid>
							<Grid
								container
								direction="row"
								justify="flex-start"
								alignItems="flex-start"
								style={{ marginLeft: "4%" }}
							>
								<Typography
									variant="h4"
									style={{ marginBottom: 20, fontStyle: "italic" }}
								>
									${product.precio}
								</Typography>
							</Grid>
							<Grid
								container
								style={{ marginBottom: "8%" }}
								spacing={4}
								justify="center"
							></Grid>
							<Grid container justify="center" spacing={4}>
								<Button
									color="primary"
									variant="contained"
									style={{ padding: 10, width: "80%", marginBottom: 10 }}
									onClick={(e) => handleClickCarrito("buy")}
								>
									Comprar
								</Button>
								<Button
									color="primary"
									variant="contained"
									fullWidth
									style={{ padding: 10, width: "80%" }}
									onClick={(e) => handleClickCarrito("cart")}
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
