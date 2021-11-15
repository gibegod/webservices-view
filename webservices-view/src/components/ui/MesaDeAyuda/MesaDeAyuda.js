import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { useHistory } from "react-router";
import Reclamo from "./Reclamo";
import Denuncia from "./Denuncia";
import Busqueda from "./Busqueda";

const MesaDeAyuda = () => {
  const [denunciaslist, setdenunciaslist] = useState([]);
  const [reclamoslist, setreclamoslist] = useState([]);
  let [estado, setestado] = useState("");

  const handleClickSearch = async (estado) => {
    console.log(estado);
    const listDenuncias = await axios.get(
      "http://localhost:9000/api/v1.0/denuncias/filtrar?estado=" + estado + ""
    );
    console.log(listDenuncias);
    setdenunciaslist(listDenuncias.data);

    const listReclamos = await axios.get(
      "http://localhost:9000/api/v1.0/reclamos/filtrar?estado=" + estado + ""
    );
    console.log(listReclamos);
    setreclamoslist(listReclamos.data);
  };

  const history = useHistory();

  //hay que validar tambien que el usuario sea de helpdesk
  const usernameSesion = localStorage.getItem("usuario");
  //Si el usuario no esta logueado no puede entrar a la pagina
  if (usernameSesion === "" && usernameSesion === null) {
    history.push("/signin");
  }

  return (
    <Container component="main" maxWidth="md">
      <Grid container spacing={4} paddingTop={10}>
        <Grid item xs={12}>
          <Busqueda
            estado={estado}
            setestado={setestado}
            handleClickSearch={handleClickSearch}
          />
        </Grid>
        {estado === "RESUELTO" || estado === "A resolver" ? (
          <>
            <Grid item xs={9}>
              {denunciaslist.map((denuncia) => (
                <Denuncia denuncia={denuncia} />
              ))}
            </Grid>
            <Grid item xs={9}>
              {reclamoslist.map((reclamo) => (
                <Reclamo reclamo={reclamo} />
              ))}
            </Grid>
          </>
        ) : null}
      </Grid>
    </Container>
  );
};

export default MesaDeAyuda;
