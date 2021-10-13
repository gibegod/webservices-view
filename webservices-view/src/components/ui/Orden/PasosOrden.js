import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import ElegirDomicilio from "./ElegirDomicilio";
import ElegirMedioPago from "./ElegirMedioPago";
import ResumenCompra from "./ResumenCompra";

const steps = ["Domicilio y Medio de pago", "Confirmar"];

export default function PasosOrden() {
	const [activeStep, setActiveStep] = React.useState(0);
	const [skipped, setSkipped] = React.useState(new Set());

	const [iddomicilio, setiddomicilio] = useState();
	const [idmediopago, setidmediopago] = useState();
	const [alertaerror, setalertaerror] = useState(false);

	let listacarrito = localStorage.getItem("carrito");
	listacarrito = JSON.parse(listacarrito);
	const productoactual = listacarrito[0];

	const isStepSkipped = (step) => {
		return skipped.has(step);
	};

	// const handleNext = () => {
	//   let newSkipped = skipped;
	//   if (isStepSkipped(activeStep)) {
	//     newSkipped = new Set(newSkipped.values());
	//     newSkipped.delete(activeStep);
	//   }

	//   setActiveStep((prevActiveStep) => prevActiveStep + 1);
	//   setSkipped(newSkipped);
	// };

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const handleNext = () => {
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

        let usuariols = localStorage.getItem("usuario");
        usuariols = JSON.parse(usuariols);

        ordenls.domicilio = iddomicilio;
        ordenls.mediopago = idmediopago;
        //ordenls.comprador = usuariols.id;

        localStorage.setItem("orden", JSON.stringify(ordenls));
				break;
			case 1: //Confirmar

        //Mandar a la API

        //Borrar el primer producto del carrito

        //Borrar orden
				break;
			default:
				break;
		}

		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	function getStepContent(stepIndex) {
		switch (stepIndex) {
			case 0:
				return (
					<Grid container spacing={5}>
						<Grid item xs={12}>
							<ElegirDomicilio
								iddomicilio={iddomicilio}
								setiddomicilio={setiddomicilio}
							/>
						</Grid>
						<Grid item xs={12}>
							<ElegirMedioPago
								idmediopago={idmediopago}
								setidmediopago={setidmediopago}
								mediosdepagoproducto={productoactual.mediosdepago}
							/>
						</Grid>
					</Grid>
				);
			case 1:
			return (
        <ResumenCompra
          productoactual={productoactual}
        />
			);
			default:
				return "Unknown stepIndex";
		}
	}

	return (
		<Container maxWidth="md">
			<Typography variant="h3" align="center" gutterBottom className="pt-3">
				COMPRA
			</Typography>
			<Typography variant="h4" align="center" gutterBottom>
				Producto: {productoactual.nombre} x{productoactual.cantidad}
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
					<Alert severity="error">Se deben completar ambos campos</Alert>
				) : null}

				{activeStep === steps.length ? (
					<React.Fragment>
						<Typography sx={{ mt: 2, mb: 1 }}>
							All steps completed - you&apos;re finished
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
