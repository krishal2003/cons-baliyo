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

Finance.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Finance() {
  const { user } = useAuthContext();

  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Finance | ESAN</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Stack flexDirection="row" alignItems="center" gap={2}>
          <Applications />
          <Typography>by</Typography>
          <Providers />
          <Typography>from</Typography>
          <Offices />
          <Typography>for</Typography>
          <Time />
        </Stack>
        {/* <Box sx={{pt:3}} > 

        <University/>
        </Box> */}
      </Container>
    </>
  );
}
