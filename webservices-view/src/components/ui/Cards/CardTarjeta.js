import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";

export default function CardTarjeta() {
	return (
		<Card sx={{ minWidth: 275 }} className="mb-1">
			<Grid container spacing={4}>
				<Grid item xs={12} sm={8}>
					<CardContent>
						<Typography
							sx={{ fontSize: 14 }}
							color="text.secondary"
							gutterBottom
						>
							Credito o debito
						</Typography>
						<Typography variant="h5" component="div">
							Terminada en XXXX
						</Typography>
						<Typography sx={{ mb: 1.5 }} color="text.secondary">
							Banco: <br />
							Vencimiento:
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
