import { Paper } from "@mui/material";
import React from "react";
import ApplicationStepper from "src/sections/_examples/mui/stepper/ApplicationStepper";

function Progression() {
  return (
    <Paper
        sx={{
            mt:3,
          p: 3,
          width: '100%',
          boxShadow: (theme) => theme.customShadows.z8,
        }}
      >
        <ApplicationStepper />
      </Paper>
  );
}

export default Progression;
