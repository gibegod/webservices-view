import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";

const Publicaciones = () => {
	let history = useHistory();

	let usuarioSesion = localStorage.getItem("usuario");
	//Si el usuario no esta logueado no puede entrar a la pagina
	if (usuarioSesion === "" || usuarioSesion === null) {
		history.push("/signin");
	}

	//Transformo el texto en JSON
	usuarioSesion = JSON.parse(usuarioSesion);

  //States
  const [listaproductos, setlistaproductos] = useState([]);

  const fetchApi = async (id) => {
		const result = await axios.get(`http://localhost:8084/productos/${id}`);
		console.log(result.data);

    setlistaproductos(result.data);
	};

	useEffect(() => {
		fetchApi(usuarioSesion.id);
	}, [usuarioSesion.id]);


  return (<p>s</p>);
}
 
export default Publicaciones;