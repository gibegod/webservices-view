import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ElegirDomicilio = (props) => {
  const {iddomicilio, setiddomicilio, datosusuario} = props;

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
          {datosusuario.domicilios.map(dom => (
            <MenuItem value={dom.id}>{dom.calle} {dom.numero} - {dom.localidad}</MenuItem>
          ))}
				</Select>
			</FormControl>
		</div>
	);
};

export default ElegirDomicilio;
