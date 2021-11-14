import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import "./catalogo.css";
import Sidebar from "./Sidebar";
import CardProducto from "./CardProducto";
import Busqueda from "./Busqueda";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Catalogo = () => {
	let history = useHistory();

	const usuarioSesion = localStorage.getItem("usuario");
	//Si el usuario no esta logueado no puede entrar a la pagina
	if (usuarioSesion === "" || usuarioSesion === null) {
		history.push("/signin");
	}

	//States
	const [search, setsearch] = useState("");
	const [order, setorder] = useState("Default");
	const [productlist, setproductlist] = useState([]);
	const [categorieslist, setcategorieslist] = useState([]);
	const [preciominimo, setpreciominimo] = useState();
	const [preciomaximo, setpreciomaximo] = useState();
	const [show, setshow] = useState(true);

	const getDesdeApi = async () => {
		const resultProductos = await axios.get("http://localhost:8084/productos/");
		setproductlist(resultProductos.data);
		const resultCategorias = await axios.get(
			"http://localhost:8084/productos/categorias"
		);
		setcategorieslist(resultCategorias.data);

		console.log(resultProductos.data);
	};

	useEffect(() => {
		getDesdeApi();
	}, []);

	const getProductosPorNombre = async (busqueda) => {
		const result = await axios.get(`http://localhost:8084/productos/name=${busqueda}`);
		console.log(busqueda);
		console.log(result)
		setproductlist(result.data);
	}

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

	const filtrarProductosPorPrecio = (e) => {
		e.preventDefault();

		let auxproductos = productlist;
		auxproductos = auxproductos.filter(
			(prod) => prod.precio >= preciominimo && prod.precio <= preciomaximo
		);
		setproductlist(auxproductos);
	};

	const filtrarProductosPorCategoria = async (e, idCategoria) => {
		e.preventDefault();

		let auxproductos = productlist;

		auxproductos = auxproductos.filter(
			(prod) => prod.categoria.id === idCategoria
		);
		setproductlist(auxproductos);
	};

	const limpiarFiltros = (e) => {
		setsearch("");
		setpreciomaximo();
		setpreciominimo();

		getDesdeApi();
	}

	const handleClickSearch = () => {
		getProductosPorNombre(search);
	};

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
							preciominimo={preciominimo}
							setpreciominimo={setpreciominimo}
							preciomaximo={preciomaximo}
							setpreciomaximo={setpreciomaximo}
							filtrarProductosPorPrecio={filtrarProductosPorPrecio}
							filtrarProductosPorCategoria={filtrarProductosPorCategoria}
							limpiarFiltros={limpiarFiltros}
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
