import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import React, { useState } from 'react';
import Head from 'next/head';
import Created from 'src/components/application-steps/Created';
import { Container, Box, StepLabel, useMediaQuery, useTheme } from '@mui/material';
import { useSettingsContext } from 'src/components/settings';
import DashboardLayout from 'src/layouts/dashboard';
import DocsRequested from 'src/components/application-steps/DocsRequested';
import VisaCreated from 'src/components/application-steps/VisaCreated';
import Confirmed from 'src/components/application-steps/Confirmed';
import Enrolled from 'src/components/application-steps/Enrolled';
import Granted from 'src/components/application-steps/Granted';
import Interested from 'src/components/application-steps/Interested';
import Offered from 'src/components/application-steps/Offered';
import Submitted from 'src/components/application-steps/Submitted';
import VisaSubmitted from 'src/components/application-steps/VisaRequested';

Application.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

interface StepComponentProps {
  step: string;
}

const steps = [
  'Created',
  'Submitted',
  'Confirmed',
  'Visa Created',
  'Visa Submitted',
  'Docs Requested',
  'Granted',
  'Enrolled',
];

const StepComponent: React.FC<StepComponentProps> = ({ step }) => {
  switch (step) {
    case 'Interested':
      return <Interested />;
    case 'Created':
      return <Created />;
    case 'Submitted':
      return <Submitted />;
    case 'Offered':
      return <Offered />;
    case 'Confirmed':
      return <Confirmed />;
    case 'Visa Created':
      return <VisaCreated />;
    case 'Visa Submitted':
      return <VisaSubmitted />;
    case 'Docs Requested':
      return <DocsRequested />;
    case 'Granted':
      return <Granted />;
    case 'Enrolled':
      return <Enrolled />;

    default:
      return null;
  }
};

export default function Application() {
  const [activeStep, setActiveStep] = useState(0);
  const { themeStretch } = useSettingsContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleStepClick = (index: React.SetStateAction<number>) => {
    setActiveStep(index);
  };

  return (
    <>
      <Head>
        <title> Application | ESAN</title>
      </Head>
      <div>
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Box sx={{ width: '100%', pt: 3 }}>
            <Stepper
              nonLinear
              activeStep={activeStep}
              alternativeLabel={!isMobile}
              orientation={isMobile ? 'vertical' : 'horizontal'}
            >
              {steps.map((label, index) => (
                <Step key={label} onClick={() => handleStepClick(index)}>
                  <Box sx={{ cursor: 'pointer' }}>
                    <StepLabel>{label}</StepLabel>
                  </Box>
                </Step>
              ))}
            </Stepper>
          </Box>
          <StepComponent step={steps[activeStep]} />
        </Container>
      </div>
    </>
  );
}
