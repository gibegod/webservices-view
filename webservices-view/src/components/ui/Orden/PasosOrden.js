import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import { useHistory } from "react-router";
import axios from "axios";
import ElegirDomicilio from "./ElegirDomicilio";
import ElegirMedioPago from "./ElegirMedioPago";
import ResumenCompra from "./ResumenCompra";
import Spinner from "../Others/Spinner";

const steps = ["Domicilio y Medio de pago", "Confirmar"];

export default function PasosOrden() {
	const history = useHistory();

	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());

	const [iddomicilio, setiddomicilio] = useState();
	const [idmediopago, setidmediopago] = useState();
	const [alertaerror, setalertaerror] = useState(false);
	const [datosusuario, setdatosusuario] = useState();

	let usuarioSesion = localStorage.getItem("usuario");
	usuarioSesion = JSON.parse(usuarioSesion);

	//Traemos los datos del usuario
	const fetchApi = async (usuario) => {
		const result = await axios.get(`http://localhost:8083/usuario/${usuario}`);
		setdatosusuario(result.data);
		console.log(result.data);
	};

	useEffect(() => {
		fetchApi(usuarioSesion.usuario);
	}, [usuarioSesion.usuario]);

	let ordenls = localStorage.getItem("orden");
	ordenls = JSON.parse(ordenls);
	const productosorden = ordenls.productos;

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const handleNext = async () => {
		switch (activeStep) {
			case 0: //Mediodepago y domicilio
				if (iddomicilio === (undefined || "") || idmediopago === (undefined || "")) {
					setalertaerror(true);
					return;
				}
				setalertaerror(false);

				//Agregar al localstorage de orden
        let ordenls = localStorage.getItem("orden");
				ordenls = JSON.parse(ordenls);

				ordenls.domicilio = datosusuario.domicilios.filter(dom => dom.id === iddomicilio)[0];
				ordenls.mediopago = datosusuario.tarjetas.filter(tarj => tarj.id === idmediopago)[0];
        //ordenls.comprador = usuariols.id;

        localStorage.setItem("orden", JSON.stringify(ordenls));
				break;
			case 1: //Confirmar

				//Traer orden del localstorage
				let ordenLocalStorage = localStorage.getItem("orden");
				ordenLocalStorage = JSON.parse(ordenLocalStorage);

				const productos = ordenLocalStorage.productos;
				const idproductos = [];

				productos.forEach(prd => {
					prd.idProducto = prd.id;
					idproductos.push(prd.id);
				});

				const data = {
					total: ordenLocalStorage.total,
					domicilio: ordenLocalStorage.domicilio.id,
					comprador: usuarioSesion.id,
					idvendedor: ordenLocalStorage.productos[0].vendedor.id,
					mediopago: ordenLocalStorage.mediopago.id,
					productos: productos
				};

        //Mandar a la API
				const result = await axios.post("http://localhost:8084/venta", data);
				console.log(result.data);

				if(result.data !== "OK"){
					setalertaerror(true);
					return;
				} else {
        	//Borrar los productos comprados del carrito
					let carritoLocalStorage = localStorage.getItem("carrito");
					carritoLocalStorage = JSON.parse(carritoLocalStorage);

					carritoLocalStorage = carritoLocalStorage.filter(prd => !idproductos.includes(prd.id));

					localStorage.setItem("carrito", JSON.stringify(carritoLocalStorage));

        	//Borrar orden
					localStorage.removeItem("orden");

					//Ir al catalogo
					history.push("/catalogo");
				}
				break;
			default:
				break;
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				//Uno los medios de pago de los productos
				let mediospago = [];
				ordenls.productos.forEach(prod => {
					if(prod.credito === true) {
						mediospago.push("CREDITO");
					}
					if(prod.debito === true){
						mediospago.push("DEBITO");
					}
				});

				return (
					<Grid container spacing={5}>
						<Grid item xs={12}>
							<ElegirDomicilio
								iddomicilio={iddomicilio}
								setiddomicilio={setiddomicilio}
								datosusuario={datosusuario}
							/>
						</Grid>
						<Grid item xs={12}>
							<ElegirMedioPago
								idmediopago={idmediopago}
								setidmediopago={setidmediopago}
								mediosdepagoorden={mediospago}
								datosusuario={datosusuario}
							/>
						</Grid>
					</Grid>
				);
			case 1:
			return (
        <ResumenCompra
          productosorden={productosorden}
        />
			);
			default:
				return "Unknown stepIndex";
		}
	}

	return datosusuario === undefined ? <Spinner /> : (
		<Container maxWidth="md">
			<Typography variant="h3" align="center" gutterBottom className="pt-3">
				COMPRA
			</Typography>
			<Typography variant="h4" align="center" gutterBottom>
				Vendedor {productosorden[0].vendedor.id}
			</Typography>
			<Box sx={{ width: "100%", minHeight: "200px" }}>
				<Stepper activeStep={activeStep}>
					{steps.map((label, index) => {
						const stepProps = {};
						const labelProps = {};
						if (isStepSkipped(index)) {
							stepProps.completed = false;
						}
						return (
							<Step key={label} {...stepProps}>
								<StepLabel {...labelProps}>{label}</StepLabel>
							</Step>
						);
					})}
				</Stepper>

				{alertaerror ? (
					<Alert severity="error">Se producto un error</Alert>
				) : null}

				{activeStep === steps.length ? (
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1 }}>
							Muchas gracias por tu compra!
						</Typography>
						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Box sx={{ flex: "1 1 auto" }} />
							<Button onClick={handleReset}>Reset</Button>
						</Box>
					</React.Fragment>
				) : (
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1 }}>
							{getStepContent(activeStep)}
						</Typography>
						<Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
							<Button
								color="inherit"
								disabled={activeStep === 0}
								onClick={handleBack}
								sx={{ mr: 1 }}
							>
								Atras
							</Button>
							<Box sx={{ flex: "1 1 auto" }} />

							<Button onClick={handleNext}>
								{activeStep === steps.length - 1 ? "Finalizar" : "Continuar"}
							</Button>
						</Box>
					</React.Fragment>
				)}
			</Box>
		</Container>
	);
}
