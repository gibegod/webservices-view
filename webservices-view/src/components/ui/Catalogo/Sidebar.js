import React, { Fragment } from "react";
import { Card, CardContent, Grid } from "@material-ui/core";
import "./Catalogo";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";

const Sidebar = (props) => {
	const {
		categorieslist,
		order,
		setorder,
		getProductsByCategoryAPI,
		getProductsBySubcategoryAPI,
	} = props;

	return (
		<Card className="sidecat">
			<CardContent>
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
								//onClick={(e) => getProductsByCategoryAPI(cat.idCategory)}
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
