import React, { Fragment } from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import "./Catalogo";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";

const Sidebar = (props) => {
	const {
		categorieslist,
		order,
		setorder,
		preciominimo,
		setpreciominimo,
		preciomaximo,
		setpreciomaximo,
		filtrarProductosPorPrecio,
		filtrarProductosPorCategoria,
		limpiarFiltros
	} = props;


	return (
		<Card className="sidecat">
			<CardContent>
			<Grid container>
					<Button
								bsPrefix="btn btn-block"
								style={{
									marginBottom: "10px",
									marginLeft: "auto",
									marginRight: "auto",
									backgroundColor: "#C8EFE3",
									borderRadius: "5px",
								}}
								onClick={(e) => limpiarFiltros(e)}
							>
								LIMPIAR FILTROS
							</Button>
					</Grid>
				<h4 className="pb-2 text-center">Ordenar productos</h4>
				<div style={{ textAlign: "center" }}>
					<Dropdown>
						<Dropdown.Toggle
							id="dropdown-basic"
							style={{
								color: "black",
								backgroundColor: "#C8EFE3",
								border: "none",
							}}
						>
							{order}
						</Dropdown.Toggle>

						<Dropdown.Menu>
							<Dropdown.Item onClick={(e) => setorder("Nombre ascendente")}>
								Nombre ascendente
							</Dropdown.Item>
							<Dropdown.Item onClick={(e) => setorder("Nombre descendente")}>
								Nombre descendente
							</Dropdown.Item>
							<Dropdown.Item onClick={(e) => setorder("Mayor precio")}>
								Mayor precio
							</Dropdown.Item>
							<Dropdown.Item onClick={(e) => setorder("Menor precio")}>
								Menor precio
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
				</div>

				<h4 className="pt-4 pb-2 text-center">Precios</h4>

				<Grid container>
					<Grid item xs={6}>
						<FormControl fullWidth sx={{ m: 1 }}>
							<InputLabel htmlFor="outlined-adornment-amount">
								Minimo
							</InputLabel>
							<OutlinedInput
								id="outlined-adornment-amount"
								value={preciominimo}
								onChange={(e) => setpreciominimo(e.target.value)}
								startAdornment={
									<InputAdornment position="start">$</InputAdornment>
								}
								type="number"
							/>
						</FormControl>
					</Grid>
					<Grid item xs={6}>
						<FormControl fullWidth sx={{ m: 1 }}>
							<InputLabel htmlFor="outlined-adornment-amount">
								Maximo
							</InputLabel>
							<OutlinedInput
								id="outlined-adornment-amount"
								value={preciomaximo}
								onChange={(e) => setpreciomaximo(e.target.value)}
								startAdornment={
									<InputAdornment position="start">$</InputAdornment>
								}
							/>
						</FormControl>
					</Grid>
					<Grid container>
					<Button
								bsPrefix="btn btn-block"
								style={{
									marginTop: "5px",
									marginBottom: "10px",
									marginLeft: "auto",
									marginRight: "auto",
									backgroundColor: "#C8EFE3",
									borderRadius: "5px",
								}}
								onClick={(e) => filtrarProductosPorPrecio(e)}
							>
								Aplicar precios
							</Button>
					</Grid>
				</Grid>

				<h4 className="pt-4 pb-2 text-center">Categorias</h4>

				{categorieslist.map((cat) => (
					<Fragment key={cat.id}>
						<Grid container>
							<Button
								bsPrefix="btn btn-block"
								style={{
									marginBottom: "10px",
									marginLeft: "auto",
									marginRight: "auto",
									backgroundColor: "#C8EFE3",
									borderRadius: "5px",
								}}
								onClick={(e) => filtrarProductosPorCategoria(e, cat.id)}
							>
								{cat.nombre}
							</Button>
						</Grid>
					</Fragment>
				))}
			</CardContent>
		</Card>
	);
};

export default Sidebar;
