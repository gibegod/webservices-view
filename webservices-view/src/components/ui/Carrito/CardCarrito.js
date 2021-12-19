import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ButtonBase, Grid, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		paddingRight: "15px",
		marginTop: 5,
		maxHeight: 150,
	},
	image: {
		marginLeft: 8,
		width: 150,
		height: 150,
	},
	img: {
		maxWidth: "100%",
		maxHeight: "100%",
	},
}));

const CardCarrito = (props) => {
	const { id, nombre, precio, imagen, cantidad } = props;

	const history = useHistory();
	const classes = useStyles();

	const handleClickDelete = () => {
		let cartlocalstorage = localStorage.getItem("carrito");
		cartlocalstorage = JSON.parse(cartlocalstorage);

		cartlocalstorage = cartlocalstorage.filter((prod) => prod.id !== id);

		localStorage.setItem("carrito", JSON.stringify(cartlocalstorage));
		window.location.reload();
	};

	return (
		<Paper className={classes.paper}>
			<Grid container>
				<Grid item xs={3}>
					<ButtonBase className={classes.image}>
						<img
							className={classes.img}
							alt={nombre}
							src={imagen}
							onClick={(e) => history.push(`/producto/${id}`)}
						/>
					</ButtonBase>
				</Grid>

				<Grid item xs={6}>
					<Typography
						variant="h5"
						style={{ cursor: "pointer" }}
						onClick={(e) => history.push(`/producto/${id}`)}
					>
						{nombre}
					</Typography>
				</Grid>

				<Grid item xs={3}>
					<div
						style={{ textAlign: "end", color: "red" }}
					>
						<CloseIcon
							style={{ cursor: "pointer" }}
							onClick={(e) => handleClickDelete()}
						/>
					</div>
          <Typography variant="h6">Cantidad: {cantidad}</Typography>
          <Typography variant="h6">$ {precio.toFixed(2)} c/u</Typography>
					<Typography variant="h6">Subtotal: $ {(precio * cantidad).toFixed(2)}</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

//export default TileCart
export default React.memo(CardCarrito, (prev, next) => {
	return prev.cant === next.cant;
});
