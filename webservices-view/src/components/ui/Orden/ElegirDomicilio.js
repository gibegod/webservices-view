import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const domiciliosprueba = [
	{ id: 1, calle: "Calle Falsa", numero: 123, localidad: "Springfield" },
	{ id: 2, calle: "Maximo Paz", numero: 1023, localidad: "Monte Grande" },
	{ id: 3, calle: "Cervetti", numero: 76, localidad: "Monte Grande" },
];

const ElegirDomicilio = (props) => {
  const {iddomicilio, setiddomicilio} = props;

	return (
		<div>
			<FormControl fullWidth sx={{ m: 1, width: "80%" }}>
				<InputLabel id="demo-simple-select-helper-label">Domicilio</InputLabel>
				<Select
					labelId="demo-simple-select-helper-label"
					id="demo-simple-select-helper"
					value={iddomicilio}
					label="Domicilio"
					onChange={e => setiddomicilio(e.target.value)}
				>
					<MenuItem value="">
						<em>None</em>
					</MenuItem>
          {domiciliosprueba.map(dom => (
            <MenuItem value={dom.id}>{dom.calle} {dom.numero} - {dom.localidad}</MenuItem>
          ))}
				</Select>
			</FormControl>
		</div>
	);
};

export default ElegirDomicilio;
