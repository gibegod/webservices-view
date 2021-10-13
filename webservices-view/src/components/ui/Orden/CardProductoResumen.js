import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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
	img: {
		maxWidth: "100%",
		maxHeight: "100%",
	},
}));

const CardProductoResumen = (props) => {
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
						variant="h6"
						style={{ cursor: "pointer" }}
						onClick={(e) => history.push(`/producto/${id}`)}
					>
						{nombre}
					</Typography>
				</Grid>

				<Grid item xs={3}>
          <Typography variant="body">Cantidad: {cantidad} <br/></Typography>
          <Typography variant="body">$ {precio.toFixed(2)} c/u</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

//export default TileCart
export default React.memo(CardProductoResumen, (prev, next) => {
	return prev.cant === next.cant;
});
