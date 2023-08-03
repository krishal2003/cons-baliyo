// next
import Head from 'next/head';
// @mui
import { Container, Grid, Button, Box, Typography, Stack } from '@mui/material';
// auth
import { useAuthContext } from '../../auth/useAuthContext';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';
// sections
import { AppWelcome } from '../../sections/@dashboard/general/app';
// assets
import { SeoIllustration } from '../../assets/illustrations';
import Applications from 'src/components/reports/applications';
import Providers from 'src/components/reports/providers';
import Offices from 'src/components/reports/offices';
import Time from 'src/components/reports/time';
import University from 'src/components/reports/university';

// ----------------------------------------------------------------------

Report.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Report() {
  const { user } = useAuthContext();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Report | ESAN</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" gap={2}>
          <Applications />
          <Typography>by</Typography>
          <Providers />
          <Typography>from</Typography>
          <Offices />
          <Typography>for</Typography>
          <Time />
        </Stack>
      </Container>
    </>
  );
}



// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import Card from '@mui/material/Card';
// import Box from '@mui/material/Box';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import Other from 'src/components/applications/other';
// import Viewall from 'src/components/applications/viewall';
// import Applications from 'src/components/reports/applications';
// import Offices from 'src/components/reports/offices';
// import Providers from 'src/components/reports/providers';
// import Time from 'src/components/reports/time';
// import Student from './student';

// const App = () => {
//   const [showComponent1, setShowComponent1] = useState(false);
//   const [showComponent2, setShowComponent2] = useState(false);

//   const handleButtonClick1 = () => {
//     setShowComponent1(true);
//     setShowComponent2(false);
//   };

//   const handleButtonClick2 = () => {
//     setShowComponent1(false);
//     setShowComponent2(true);
//   };

//   return (
//     <div>
//       <Button variant="contained" onClick={handleButtonClick1}>
//         Button 1
//       </Button>
//       <Button variant="contained" onClick={handleButtonClick2}>
//         Button 2
//       </Button>

//       {showComponent1 && (
//         <Card sx={{ p: 2 }}>
//           <Box display="flex">
//             <Stack direction="column">
//               <Typography sx={{ color: '#078DEE' }} variant="h3">
//                 Rajkumar Panta
//               </Typography>
//               <Box sx={{ pt: 5 }}>
//                 <Stack direction={{ xs: 'column', sm: 'row' }} gap={{ xs: 1, sm: 32 }}>
//                   <Student />
//                   <Other />
//                 </Stack>
//               </Box>
//             </Stack>
//           </Box>
//           <Box textAlign={{ xs: 'left', sm: 'right' }} sx={{ pt: 3 }}>
//             <Viewall />
//           </Box>
//         </Card>
//       )}

//       {showComponent2 && (
//         <Stack direction={{ xs: 'column', sm: 'row' }} alignItems="center" gap={2}>
//           <Applications />
//           <Typography>by</Typography>
//           <Providers />
//           <Typography>from</Typography>
//           <Offices />
//           <Typography>for</Typography>
//           <Time />
//         </Stack>
//       )}
//     </div>
//   );
// };

// export default App;
