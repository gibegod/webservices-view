import React, { useState, useEffect } from "react";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@mui/styles';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import Spinner from "../Others/Spinner";
import Alert from "react-bootstrap/Alert";

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 400,
		flexGrow: 1,
	},
	header: {
		display: "flex",
		alignItems: "center",
		height: 50,
		paddingLeft: 32,
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

	let usuarioSesion = localStorage.getItem("usuario");
	//Si el usuario no esta logueado no puede entrar a la pagina
	if (usuarioSesion === "" || usuarioSesion === null) {
		history.push("/signin");
	}

	//Transformo el texto en JSON
	usuarioSesion = JSON.parse(usuarioSesion);

	//States
	const [producto, setproducto] = useState({});
	const [cantidad, setcantidad] = useState(1);
	const [showalert, setshowalert] = useState(false);

	//Parametro que llega desde la url
	const idProducto = useParams().id;

	const fetchApi = async (idProducto) => {
		const result = await axios.get(
			`http://localhost:8084/productos/ProductoId=${idProducto}`
		);
		console.log(result.data);

		setproducto(result.data);
	};

	useEffect(() => {
		if (idProducto !== undefined) {
			fetchApi(idProducto);
		}
	}, [idProducto]);

	const imagesCard = {
		label: producto.nombre,
		imgPath: producto.imagen,
	};

	let carritols = localStorage.getItem("carrito");

	const handleClickCarrito = (type) => {
		//Validacion de cantidad
		if(cantidad > producto.stockActual) {
			setshowalert(true);
			return;
		}

		if (
			carritols === null ||
			carritols === undefined ||
			carritols === "[]"
		) {
			//Si no hay ningun item en el carrito
			producto.cantidad = cantidad;
			localStorage.setItem("carrito", JSON.stringify([producto]));

			if (type === "carrito") alert("Producto agregado al carrito");
		} else {
			carritols = JSON.parse(carritols);

			//Buscamos si el producto esta en el carrito
			const auxprod = carritols.filter(
				(prod) => prod.id === producto.id
			)[0];

			if (auxprod === undefined) {
				//Si el producto no esta en el carrito
				producto.cantidad = cantidad;
				carritols.push(producto);
				localStorage.setItem("carrito", JSON.stringify(carritols));
				if (type === "carrito") alert("Producto agregado al carrito");
			} else {
				//Si el producto esta en el carrito
				producto.cantidad = Number(auxprod.cantidad) + Number(cantidad);

				//Filtro el producto exactamente igual del carrito
				carritols = carritols.filter(
					(prod) => prod.id !== producto.id
				);

				carritols.push(producto);
				localStorage.setItem("carrito", JSON.stringify(carritols));
				if (type === "carrito") alert("Producto agregado al carrito");
			}
		}
		if (type === "compra") history.push("/carrito");
	};

	const stockdisponible = `Stock disponible: ${producto.stockActual}`;

	//Definir medios de pago
	let mediosdepago = "";
	if (producto.debito === true && producto.credito === true) {
		mediosdepago = "Credito y Debito";
	} else if (producto.credito === true) {
		mediosdepago = "Credito";
	} else {
		mediosdepago = "Debito";
	}

	return producto.id === undefined ? (
		<Spinner />
	) : (
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
							<Grid container>
								<Typography variant="h4" align="center" style={{ padding: 20 }}>
									{producto.nombre}
								</Typography>
							</Grid>

							<Grid container style={{ marginLeft: "4%" }}>
								<Grid item xs={6}>
									<Typography variant="h5">
										${producto.precio.toFixed(2)}
									</Typography>
								</Grid>
								<Grid item xs={6}>
									<Typography variant="body2">
										Medios de pago: {mediosdepago}
									</Typography>
								</Grid>
							</Grid>

							<Grid style={{ marginBottom: "10%", marginLeft: "4%", marginTop: "10%" }}>
								<Grid item xs={6}>
									<TextField
										fullWidth
										id="cantidad"
										label="Cantidad"
										name="cantidad"
										inputProps= {{ min: 1, max: producto.stockActual }}
										value={cantidad}
										onChange={(e) => setcantidad(e.target.value)}
										type="number"
										helperText={stockdisponible}
									/>
								</Grid>
							</Grid>

							{showalert ? (
						<Alert
							variant="danger"
							onClose={() => setshowalert(false)}
							dismissible
							style={{ width: "100%" }}
						>
							ERROR: La cantidad seleccionada es mayor al stock disponible
						</Alert>
					) : null}


							<Grid container justify="center">
								<Button
									color="primary"
									variant="contained"
									style={{ padding: 10, width: "100%", marginBottom: 10 }}
									onClick={(e) => handleClickCarrito("compra")}
								>
									Comprar
								</Button>
								<Button
									color="primary"
									variant="contained"
									fullWidth
									style={{ padding: 10, width: "100%", marginBottom: 10 }}
									onClick={(e) => handleClickCarrito("carrito")}
								>
									Agregar al carrito
								</Button>
								<Button
									color="primary"
									variant="contained"
									fullWidth
									style={{ padding: 10, width: "100%" }}
									onClick={(e) => history.push(`/nuevadenuncia/${producto.id}`)}
								>
									Denunciar publicacion
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
