import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export default function CardDomicilio(props) {

	const {calle, numero, departamento, piso, localidad, provincia} = props;

	return (
		<Card sx={{ minWidth: 275}} className="mb-1">
			<Grid container spacing={4}>
				<Grid item xs={12} sm={8}>
					<CardContent>
						<Typography variant="h6" component="div">
							{calle} {numero} {departamento !== "" ? ` - Depto: ${departamento} piso ${piso}` : null}
						</Typography>
						<Typography sx={{ mb: 1.5 }} color="text.secondary">
							{localidad}, {provincia}
						</Typography>
					</CardContent>
				</Grid>
				<Grid item xs={12} sm={4}>
					<CardActions>
						<Button size="small">Eliminar</Button>
					</CardActions>
				</Grid>
			</Grid>
		</Card>
	);
}
