import Head from 'next/head';
// @mui
import { Box, Button, CardMedia, Container, Tab, Tabs } from '@mui/material';
// layouts
import MainLayout from 'src/layouts/main/MainLayout';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_DASHBOARD, PATH_PAGE } from 'src/routes/paths';
import { useCallback, useEffect, useState } from 'react';
import Iconify from 'src/components/iconify/Iconify';
import Overview from 'src/sections/touraments-tab/Overview';
import Participants from 'src/sections/touraments-tab/Participants';
import LiveStreaming from 'src/sections/touraments-tab/LiveStreaming';

import ComingSoonPage from '../../../coming-soon';
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
import TournamentFAQ from 'src/sections/tournaments/TournamentFAQ';
import TournamentSponsor from 'src/sections/tournaments/TournamentSponsor';
import { useRouter } from 'next/router';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import { useSnackbar } from 'notistack';
import { Tournament } from 'src/@types/tournaments';

// ----------------------------------------------------------------------

TournamentPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function TournamentPage() {
  const [tournamentList, setTournamentList] = useState<Tournament>();

  const {
    query: { tournamentSlug },
  } = useRouter();

  const [loading, setLoading] = useState(true);

  const getTournament = useCallback(async () => {
    try {
      const response = await axiosInstance2.get(`/tournament-detail/${tournamentSlug}`);
      setTournamentList(response.data.tournament);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }, [tournamentSlug]);

  useEffect(() => {
    getTournament();
  }, [getTournament]);

  // eslint-disable-next-line @typescript-eslint/no-shadow

  const [currentTab, setCurrentTab] = useState('overview');

  const TABS = [
    {
      value: 'overview',
      label: 'Overview',
      icon: <Iconify icon="material-symbols:overview" />,
      component: tournamentList && <Overview tournament={tournamentList} />,
    },
    {
      value: 'prizes',
      label: 'Prizes',
      icon: <Iconify icon="fa-solid:gifts" />,
      component: <ComingSoonPage />,
    },
    {
      value: 'participants',
      label: 'Participants',
      icon: <Iconify icon="mdi:people-group" />,
      component: <Participants />,
    },
    {
      value: 'live_streaming',
      label: 'Live Streaming',
      icon: <Iconify icon="ic:baseline-live-tv" />,
      component: <LiveStreaming />,
    },
    {
      value: 'upcoming matches',
      label: 'Upcoming Matches',
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <ComingSoonPage />,
    },
    {
      value: 'past_matches',
      label: 'Past Matches',
      icon: <Iconify icon="ph:game-controller-fill" />,
      component: <ComingSoonPage />,
    },
    {
      value: 'brackets',
      label: 'Brackets',
      icon: <Iconify icon="material-symbols:team-dashboard-sharp" />,
      component: <ComingSoonPage />,
    },
    {
      value: 'faq',
      label: 'FAQ',
      icon: <Iconify icon="mdi:faq" />,
      component: <TournamentFAQ />,
    },
    {
      value: 'sponsor',
      label: 'Sponsor',
      icon: <Iconify icon="ph:handshake-fill" />,
      component: <TournamentSponsor />,
    },
  ];

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleEditRow = () => {
    axiosInstance2
      .post(`/verify-tournament/?slug=${tournamentSlug}`)
      .then((res) => {
        enqueueSnackbar('Done', { variant: 'success' });
        router.push(PATH_DASHBOARD.all_tournament.list);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error Verifying', { variant: 'error' });
      });
  };

  if (!tournamentList) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Head>
        <title> {tournamentList.tournament_name} | ESAN</title>
      </Head>

      <Container sx={{ pt: 1, pb: 10, position: 'relative' }}>
        <CustomBreadcrumbs
          heading={tournamentList.tournament_name}
          links={[
            { name: 'Home', href: '/' },
            { name: 'Tournaments', href: PATH_PAGE.tournaments },
            { name: tournamentList.tournament_name },
          ]}
          action={
            <Button
              variant="contained"
              onClick={handleEditRow}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Verify Tournament
            </Button>
          }
        />
        <CardMedia
          component="img"
          alt="loading"
          height="300"
          src={BASE_IMAGE_PATH + tournamentList.tournament_banner}
          sx={{ objectFit: 'cover', objectPosition: 'center', pb: 3 }}
        />

        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {TABS.map((tab) => tab.value === currentTab && <Box key={tab.value}>{tab.component}</Box>)}
      </Container>
    </>
  );
}
