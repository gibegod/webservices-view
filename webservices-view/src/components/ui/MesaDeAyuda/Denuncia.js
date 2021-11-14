import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import TextField from "@mui/material/TextField";

const Denuncia = ({ denuncia }) => {
  const [comentarioResolucion, setComentarioResolucion] = useState("");

  const getAtenderDenuncia = (id, comentario_resolucion) => {
    axios.put(
      "http://localhost:9000/api/v1.0/denuncias/atender?aceptado=true&comentarioResolucion=" +
        comentario_resolucion +
        "&idDenuncia=" +
        id +
        ""
    );
  };

  const getRechazarDenuncia = (id, comentario_resolucion) => {
    axios.put(
      "http://localhost:9000/api/v1.0/denuncias/atender?aceptado=false&comentarioResolucion=" +
        comentario_resolucion +
        "&idDenuncia=" +
        id +
        ""
    );
  };

  return (
    <>
      <h3>Denuncia HD{denuncia.id}</h3>
      <h4>Producto asociado: {denuncia.pedido}</h4>
      <h4>Estado: {denuncia.estado}</h4>
      <p>Comentario: {denuncia.comentarioComprador}</p>
      {denuncia.estado === "RESUELTO" ? (
        <p>Comentario: {denuncia.comentario_resolucion}</p>
      ) : (
        <>
          <TextField
            id="comentarioResolucion"
            label="Resolucion"
            variant="standard"
            value={comentarioResolucion}
            onChange={(e) => setComentarioResolucion(e.target.value)}
          />
          <Button
            variant="contained"
            style={{
              backgroundColor: "green",
              color: "white",
            }}
            size="large"
            onClick={(e) =>
              getAtenderDenuncia(denuncia.id, comentarioResolucion)
            }
          >
            <Typography variant="button" display="block">
              Eliminar publicacion
            </Typography>
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "red",
              color: "white",
            }}
            size="large"
            onClick={(e) =>
              getRechazarDenuncia(denuncia.id, comentarioResolucion)
            }
          >
            <Typography variant="button" display="block">
              Rechazar
            </Typography>
          </Button>
        </>
      )}
    </>
  );
};

export default Denuncia;
