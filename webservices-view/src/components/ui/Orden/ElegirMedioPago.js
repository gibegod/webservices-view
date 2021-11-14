import React, { useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

let mediosdepagoprueba = [
	{ id: 1, tipo: "Credito", numero: 41241241241, banco: "Santander" },
	{ id: 2, tipo: "Credito", numero: 837243243, banco: "BBVA" },
	{ id: 3, tipo: "Debito", numero: 98162497624, banco: "Galicia" },
	{ id: 4, tipo: "MercadoPago", numero: 98162497624, banco: "Galicia" },
];

const ElegirMedioPago = (props) => {
	const { idmediopago, setidmediopago, mediosdepagoorden, datosusuario } = props;

	let mediosdepagohabilitados = datosusuario.tarjetas.filter(tarj =>
		mediosdepagoorden.includes(tarj.tipo)
	);
	
	console.log(mediosdepagohabilitados);

	return (
		<div>
			<FormControl fullWidth sx={{ m: 1, width: "80%" }}>
				<InputLabel id="demo-simple-select-helper-label">
					Medio de pago
				</InputLabel>
				<Select
					labelId="demo-simple-select-helper-label"
					id="demo-simple-select-helper"
					value={idmediopago}
					label="Medio de pago"
					onChange={(e) => setidmediopago(e.target.value)}
				>
					{mediosdepagohabilitados.map((medio) => (
						<MenuItem value={medio.id}>
							{medio.tipo} - {medio.numero}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
};

export default ElegirMedioPago;
