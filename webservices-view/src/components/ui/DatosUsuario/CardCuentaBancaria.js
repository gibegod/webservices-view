import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export default function CardCuentaBancaria({cuentabancaria}) {

	console.log(cuentabancaria);

	return (
		<Card sx={{ minWidth: 275 }}>
			<Grid container spacing={4}>
				<Grid item xs={12} sm={8}>
					<CardContent>
						<Typography variant="h5" component="div">
							Banco {cuentabancaria.banco}
						</Typography>
						<Typography sx={{ mb: 1.5 }} color="text.secondary">
							CBU: {cuentabancaria.cbu} <br />
							Alias: {cuentabancaria.alias}
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
