import React, { Fragment, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonBase, Grid, Paper, Typography } from "@material-ui/core";
import "./catalogo.css";
import CardActionArea from "@material-ui/core/CardActionArea";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		marginTop: 8,
		marginLeft: 20,
		maxWidth: 900,
		maxHeight: 160,
	},
	image: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(2),
		width: 150,
		height: 160,
	},
	img: {
		maxWidth: "100%",
		maxHeight: "100%",
	},
}));

const CardProducto = ({ prod }) => {
	const history = useHistory();
	const classes = useStyles();

	const { id, nombre, precio, imagen } = prod;

	return (
		<Paper className={classes.paper}>
			<CardActionArea onClick={(e) => history.push(`/producto/${id}`)}>
				<Grid container>
					<Grid item>
						<ButtonBase className={classes.image}>
							<img className={classes.img} alt={nombre} src={imagen} />
						</ButtonBase>
					</Grid>
					<Grid item xs={12} sm container>
						<Grid item xs container direction="column">
							<Grid item xs>
								<Typography
									gutterBottom
									variant="h5"
									style={{ paddingTop: "8px" }}
								>
									{nombre}
								</Typography>

								<Typography variant="h5">$ {precio}</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</CardActionArea>
		</Paper>
	);
};

export default CardProducto;
