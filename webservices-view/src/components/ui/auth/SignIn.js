import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Alert from "react-bootstrap/Alert";
import axios from 'axios';
import { useHistory } from "react-router-dom";

const theme = createTheme();

export default function SignIn() {
  let history = useHistory();

  const usernameSesion = localStorage.getItem("usuario");
	//Si el usuario esta logueado no puede entrar a la pagina
	if (usernameSesion !== "" && usernameSesion !== undefined) {
		history.push("/");
	}

  //States
  const [usuario, setusuario] = useState("");
  const [password, setpassword] = useState("");
  const [showalert, setshowalert] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = {user: usuario, pass: password}
    //Envio la info a la api
    const loguearse = await axios.post("http://localhost:8083/usuario/login", user);
    console.log(loguearse.data);

    if (loguearse.data === "OK"){
      //Si no hay error guardar el user en localstorage y pushear a pantalla principal

      const userbd = await axios.get(`http://localhost:8083/usuario/${usuario}`);
      console.log(userbd);

			localStorage.setItem(
				"usuario",
				JSON.stringify({
					usuario: userbd.data.usuario,
          nombre: userbd.data.nombre,
          apellido: userbd.data.apellido,
          id: userbd.data.id,
          tipousuario: userbd.data.tipoUsuario,
				})
			);
			setshowalert(false);

			history.push("/");
		} else {
			//Si hay un error mostrar en pantalla
			setshowalert(true);
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>

          {showalert ? (
						<Alert
							variant="danger"
							onClose={() => setshowalert(false)}
							dismissible
							style={{ width: "100%" }}
						>
							ERROR: Datos incorrectos
						</Alert>
					) : null}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="usuario"
              label="Usuario"
              name="usuario"
              autoFocus
              onChange={(e) => setusuario(e.target.value)}
              type="text"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              onChange={(e) => setpassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              INICIAR SESIÓN
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  Todavia no tienes una cuenta? Registrate!
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}