import React, { useEffect, useState } from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import TextField from "@mui/material/TextField";

const Reclamo = ({ reclamo }) => {
  const [comentarioResolucion, setComentarioResolucion] = useState("");

  const getAtenderReclamo = async (id, comentario_resolucion) => {
    const resultado = await axios.put(
      "http://localhost:9000/api/v1.0/reclamos/atender?aceptado=true&comentarioResolucion=" +
        comentario_resolucion +
        "&idReclamo=" +
        id +
        ""
    );
    console.log(resultado);
  };
  const getRechazarReclamo = async (id, comentario_resolucion) => {
    const resultado = await axios.put(
      "http://localhost:9000/api/v1.0/reclamos/atender?aceptado=false&comentarioResolucion=" +
        comentario_resolucion +
        "&idReclamo=" +
        id +
        ""
    );
    console.log(resultado);
  };
  return (
    <>
      <h3>Reclamo HD{reclamo.id}</h3>
      <h4>Compra asociada: {reclamo.id_venta}</h4>
      <h4>Estado: {reclamo.estado}</h4>
      <p>Comentario: {reclamo.comentario_comprador}</p>
      {reclamo.estado === "RESUELTO" ? (
        <p>Comentario: {reclamo.comentario_resolucion}</p>
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
            onClick={(e) => getAtenderReclamo(reclamo.id, comentarioResolucion)}
          >
            <Typography variant="button" display="block">
              Hacer devolucion
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
              getRechazarReclamo(reclamo.id, comentarioResolucion)
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

export default Reclamo;
