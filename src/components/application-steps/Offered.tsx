import { Stack, Card, Typography, Box } from '@mui/material';
import React from 'react';
import Country from '../applications/country';
import Other from '../applications/other';
import SearchBar from '../applications/search';
import Student from '../applications/student';
import Viewall from '../applications/viewall';

function Offered() {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      justifyContent={{ xs: 'space-between', sm: 'space-between' }}
      gap={{ xs: '23px' }}
      sx={{ pt: 3 }}
    >
      <Box>
        <Card sx={{ p: 2 }}>
          <Box display="flex">
            <Stack direction="column">
              <Typography sx={{ color: '#078DEE' }} variant="h3">
                Rajkumar Panta
              </Typography>
              <Box sx={{ pt: 5 }}>
                <Stack direction={{ xs: 'column', sm: 'row' }} gap={{ xs: 1, sm: 32 }}>
                  <Student />
                  <Other />
                </Stack>
              </Box>
            </Stack>
          </Box>
          <Box textAlign={{ xs: 'left', sm: 'right' }} sx={{ pt: 3 }}>
            <Viewall />
          </Box>
        </Card>
      </Box>
      <Box>
        <Card sx={{ p: 2 }}>
          <Country />
          <SearchBar />
        </Card>
      </Box>
    </Stack>
  );
}

export default Offered;
