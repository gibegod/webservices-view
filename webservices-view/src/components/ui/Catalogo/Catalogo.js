import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import "./catalogo.css";
import Sidebar from "./Sidebar";
import CardProducto from "./CardProducto";
import Busqueda from "./Busqueda";

const productoprueba = [{id: 1, nombre: "Calcetines", descripcion: "asdasd asd as fas d asd asd as das sdas d asf as fas d asd sa das d asd as", imagen: "https://www.brildor.com/media/catalog/product/cache/21d516047c3b0f7c4a4c397e20cf92ab/c/a/calcetines-d3.jpg", precio: 12.3, stock: 2}, {id: 2, nombre: "Calcetines v2", descripcion: "asdasd asd as fas d asd asd as das sdas d asf as fas d asd sa das d asd as", imagen: "https://www.brildor.com/media/catalog/product/cache/21d516047c3b0f7c4a4c397e20cf92ab/c/a/calcetines-d3.jpg", precio: 5, stock: 3}];

const categoriasprueba = [{id: 1, nombre: "Zapatillas"},{id: 2, nombre: "Remeras"},{id: 3, nombre: "Sombreros"}]


const Catalogo = () => {
	//States
	const [search, setsearch] = useState("");
	const [order, setorder] = useState("Default");
	const [productlist, setproductlist] = useState(productoprueba);
	const [categorieslist, setcategorieslist] = useState(categoriasprueba);
	const [show, setshow] = useState(true);

	// const getProductsAPI = () => {
	//   apiAxios
	//     .get("/product/allproduct")
	//     .then(({ data }) => {
	//       setproductlist(data);
	//       console.log(data);
	//       setshow(true);
	//     })
	//     .catch((error) => console.log(error));
	// };

	// const getCategoriesAPI = () => {
	//   apiAxios
	//     .get("/category/allcategories")
	//     .then(({ data }) => {
	//       setcategorieslist(data);
	//       console.log(data);
	//     })
	//     .catch((error) => console.log(error));
	// };

	// const getProductsByCategoryAPI = (catid) => {
	//   apiAxios
	//   .get("/product/productByCategory", {
	//     params: { idCategory: catid },
	//   })
	//   .then(({ data }) => {
	//     setproductlist(data);
	//     console.log(data);
	//   })
	//   .catch((error) => console.log(error));
	// }

	// const getProductsBySubcategoryAPI = (subcatid) => {
	//   apiAxios
	//   .get("/product/productBySubcategory", {
	//     params: { idSubcategory: subcatid },
	//   })
	//   .then(({ data }) => {
	//     setproductlist(data);
	//     console.log(data);
	//   })
	//   .catch((error) => console.log(error));
	// }

	// const getProductsByName = (search) => {
	//   apiAxios
	//   .get("/product/productByName", {
	//     params: { nombre: search },
	//   })
	//   .then(({ data }) => {
	//     setproductlist(data);
	//     console.log(data);
	//   })
	//   .catch((error) => console.log(error));
	// }

	//Ordenar productos
	if (order === "Menor precio") {
		productlist.sort((a, b) => parseFloat(a.precio) - parseFloat(b.precio));
	} else if (order === "Mayor precio") {
		productlist.sort((a, b) => parseFloat(b.precio) - parseFloat(a.precio));
	} else if (order === "Nombre ascendente") {
		productlist.sort((a, b) => a.nombre.localeCompare(b.nombre));
	} else if (order === "Nombre descendente") {
		productlist.sort((a, b) => b.nombre.localeCompare(a.nombre));
	}

	const handleClickSearch = () => {
		// getProductsByName(search);
	};

	useEffect(() => {
		// getProductsAPI();
		// getCategoriesAPI();
	}, []);

	return show ? (
		<div className="contenedor">
			<Container maxWidth={"lg"} className="tilescolumn">
				<Grid container spacing={1}>
					<Grid item xs={3}>
						<Busqueda
							search={search}
							setsearch={setsearch}
							handleClickSearch={handleClickSearch}
						/>
						<Sidebar
							categorieslist={categorieslist}
							order={order}
							setorder={setorder}
							//getProductsByCategoryAPI={getProductsByCategoryAPI}
							//getProductsBySubcategoryAPI={getProductsBySubcategoryAPI}
						/>
					</Grid>
					{productlist.length === 0 ? (
						<p>
							No hay productos que coincidan con su busqueda, intente otra vez.
						</p>
					) : (
						<Grid item xs={9}>
							{productlist.map((prod) => (
								<CardProducto key={prod.id} prod={prod} />
							))}
						</Grid>
					)}
				</Grid>
			</Container>
		</div>
	) : null;
};

export default Catalogo;
