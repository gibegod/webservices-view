import React, { useState, Fragment } from "react";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import PageviewRoundedIcon from "@mui/icons-material/PageviewRounded";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import axios from "axios";
import Reclamo from "./Reclamo";
import Denuncia from "./Denuncia";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      width: "100%",
    },
  },
}));

export default function Busqueda({ estado, setestado, handleClickSearch }) {
  const classes = useStyles();
  console.log(estado);
  return (
    <Fragment>
      <Grid container direction="row" justify="center" alignItems="center">
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            variant="outlined"
            label="Buscar por estado"
            onChange={(e) => setestado(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    aria-label="toggle password visibility"
                    onClick={(e) => handleClickSearch(estado)}
                  >
                    <PageviewRoundedIcon
                      style={{ fontSize: "30px", color: "#007A9A" }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
      </Grid>
    </Fragment>
  );
}
