import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

function Student() {
  return (
    <Box>
      <Box>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ color: 'text.disabled' }}>College </Typography>
          <Typography variant="h5" sx={{ pl: 2.5 }}>
            Sydney Univeristy
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ color: 'text.disabled' }}>Course</Typography>
          <Typography variant="h5" sx={{ pl: 3   }}>
            Bachelor Honors in Computing
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Typography sx={{ color: 'text.disabled' }}>Provider</Typography>
          <Typography variant="h5" sx={{ pl: 2 }}>
            Sydney University of Arts
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default Student;
