import React from "react";
import { makeStyles } from "@material-ui/styles";
import { ButtonBase, Grid, Paper, Typography } from "@material-ui/core";
import { useHistory } from "react-router";

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
		marginLeft: theme.spacing(1),
		width: 150,
		height: 150,
	},
	img: {
		maxWidth: "100%",
		maxHeight: "100%",
	},
}));

const CardCompra = (props) => {
	const { id, nombre, precio, imagen, cantidad } = props;

	const history = useHistory();
	const classes = useStyles();

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
          <Typography variant="h6">Cantidad: {cantidad}</Typography>
          <Typography variant="h6">$ {precio} c/u</Typography>
					<Typography variant="h6">Subtotal: $ {(precio * cantidad)}</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

//export default TileCart
export default React.memo(CardCompra, (prev, next) => {
	return prev.cant === next.cant;
});
