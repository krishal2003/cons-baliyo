import { useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import {
  Box,
  Step,
  Paper,
  Button,
  Stepper,
  StepLabel,
  Typography,
  StepContent,
} from '@mui/material';

// ----------------------------------------------------------------------

const steps = [
  {
    label: 'Submit Application',
    description: `Submit the created application through the website to transfer the data for further processing.`,
  },
  {
    label: 'Confirm Application',
    description: `Verify the submitted application, ensuring all required fields are filled out correctly and necessary documents are attached.`,
  },
  {
    label: 'Make VISA ',
    description: `Generate the required visa documents based on the user's request and type of consultancy services.`,
  },
  {
    label: 'VISA Submission',
    description: `Submit the generated visa documents to the appropriate authorities responsible for processing visa applications.`,
  },
  {
    label: 'Request Documents',
    description: `Receive and notify users about additional documents or information requested by the visa authorities.`,
  },
  {
    label: 'Grant the application',
    description: `Receive notification of the approved visa application from the authorities, indicating the successful outcome.`,
  },
  {
    label: 'Enroll',
    description: `Enroll the processed application, marking it as successfully completed and enabling users to proceed with the consultancy services.`,
  },

];

export default function ApplicationStepper() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mt: 3 }}>
                <Button variant="contained" onClick={handleNext}>
                  {index === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button disabled={index === 0} onClick={handleBack}>
                  Back
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length && (
        <Paper
          sx={{
            p: 3,
            mt: 3,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
          }}
        >
          <Typography paragraph>All steps completed.</Typography>
          {/* <Button onClick={handleReset}>Reset</Button> */}
          <Button variant='contained'>Submit</Button>
        </Paper>
      )}
    </>
  );
}
