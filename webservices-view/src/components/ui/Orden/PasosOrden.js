import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import ElegirDomicilio from './ElegirDomicilio';

const steps = ['Medio de pago', 'Domicilio', 'Confirmar'];

export default function PasosOrden() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

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
      case 0: //Mediodepago
        // if (
        //   street === "" ||
        //   number === "" ||
        //   postalcode === "" ||
        //   locality === "" ||
        //   province === ""
        // ) {
        //   seterror(true);
        //   return;
        // }
        // seterror(false);

        // const direction = {
        //   street,
        //   number: parseInt(number, 10),
        //   flat: parseInt(floor, 10),
        //   apartment: dep,
        //   postalCode: parseInt(postalcode, 10),
        //   location: locality,
        //   province,
        // };

        // createDirectionAPI(direction);

        // //Agrego el usuario al pedido
        // var orderls = localStorage.getItem("order");
        // orderls = JSON.parse(orderls);
        // var userls = localStorage.getItem("iduser");
        // userls = JSON.parse(userls);

        // const user = {
        //   id: userls,
        // };

        // orderls.user = user;
        // localStorage.setItem("order", JSON.stringify(orderls));
        break;
      case 1: //Domicilio
      
        break;
      case 2: //Confirmar
        

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
          <ElegirDomicilio/>
        );
      case 1:
        // return (
        //   <Details
        //     postalcode={postalcode}
        //     province={province}
        //     subtotalship={subtotalship}
        //     setsubtotalship={setsubtotalship}
        //     percentage={percentage}
        //     setpercentage={setpercentage}
        //     subtotalprod={subtotalprod}
        //     setsubtotalprod={setsubtotalprod}
        //     discountid={discountid}
        //     setdiscountid={setdiscountid}
        //   />
        // );
      case 2:
        // return (
        //   <PaymentMethod
        //     paymentmethod={paymentmethod}
        //     setpaymentmethod={setpaymentmethod}
        //     typedoc={typedoc}
        //     settypedoc={settypedoc}
        //     doc={doc}
        //     setdoc={setdoc}
        //     error={error}
        //     seterror={seterror}
        //     cardnumber={cardnumber}
        //     setcardnumber={setcardnumber}
        //     expiry={expiry}
        //     setexpiry={setexpiry}
        //     cvc={cvc}
        //     setcvc={setcvc}
        //     paydone={paydone}
        //     setpaydone={setpaydone}
        //   />
        // );
      default:
        return "Unknown stepIndex";
    }
  }

  return (
    <Container maxWidth="md">
    <Box sx={{ width: '100%', minHeight: '200px' }}>
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
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>{getStepContent(activeStep)}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
    </Container>
  );
}