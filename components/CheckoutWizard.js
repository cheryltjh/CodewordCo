import React from 'react';
import { Step, StepLabel, Stepper } from '@mui/material';

export default function CheckoutWizard({ activeStep = 0 }) {
    const classes = useStyles();
    return (
      <Stepper
        className={classes.transparentBackgroud}
        activeStep={activeStep}
        alternativeLabel
      >
        {['Login', 'Enrollment form', 'Payment Method', 'Enroll'].map(
          (step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          )
        )}
      </Stepper>
    );
  }
  