import { Stack, Card, Typography, Box } from '@mui/material';
import React from 'react';
import Country from '../applications/country';
import Other from '../applications/other';
import SearchBar from '../applications/search';
import Student from '../applications/student';
import Viewall from '../applications/viewall';
import ApplicationDialog from 'src/sections/_examples/mui/dialog/ApplicationDialog';
import Link from 'next/link';

function Created() {
  const applications = [
    { id: '1', name: 'Anita Paudel' },
    { id: '2', name: 'Dinesh Kartik' },
    { id: '3', name: 'Suresh Kumar' },
  ];
  return (
    <>
      <Box sx={{ textAlign: 'right', pt: 5 }}>
        <ApplicationDialog />
      </Box>
      <Typography sx={{ color: 'white', pt: 3, pb: 1 }} variant="h2">
        Created Applications:{' '}
      </Typography>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent={{ xs: 'space-between', sm: 'space-between' }}
        gap={{ xs: '23px' }}
        sx={{ pt: 3 }}
      >
        <Stack direction='column' gap={5}>
          {applications.map((app) => (
            <Box>
              <Card sx={{ p: 2 }}>
                <Box display="flex">
                  <Stack direction="column">
                    <Typography sx={{ color: '#078DEE' }} variant="h3">
                      {app.name}
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
                  <Link href={`/dashboard/application/${app.id}`}>
                    <Viewall />
                  </Link>
                </Box>
              </Card>
            </Box>
          ))}
        </Stack>
        <Box>
          <Card sx={{ p: 2 }}>
            <Country />
            <SearchBar />
          </Card>
        </Box>
      </Stack>
    </>
  );
}

export default Created;
