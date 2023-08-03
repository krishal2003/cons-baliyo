// next
import Head from 'next/head';
// @mui
import { Container, Tabs, Tab, Box, Divider, Button } from '@mui/material';
// layouts
import DashboardLayout from '../../../../../../layouts/dashboard';
// sections
import { useRouter } from 'next/router';
import Iconify from 'src/components/iconify/Iconify';
import { useState } from 'react';
import EventsTournaments from 'src/sections/@dashboard/events/dashboard/event-tournaments';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_DASHBOARD } from 'src/routes/paths';
import TournamentEditPostPage from 'src/sections/@dashboard/events/dashboard/tournaments/edit';
import TournamentFAQListPage from 'src/sections/@dashboard/events/dashboard/tournaments/tournament-faqs';
import TournamentSponsorsPage from 'src/sections/@dashboard/events/dashboard/tournaments/tournament-sponsors';
import TournamentStreamsListPage from 'src/sections/@dashboard/events/dashboard/tournaments/tournament-streams';
import TournamentPublishNewEditForm from 'src/sections/@dashboard/events/dashboard/tournaments/TournamentPublishNewEditForm';
import TournamentPublishPostPage from 'src/sections/@dashboard/events/dashboard/tournaments/TournamentPublishPostPage';

// ----------------------------------------------------------------------

EventsTournamentDashboard.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function EventsTournamentDashboard() {
  const {
    query: { slug, tournamentSlug },
  } = useRouter();

  const TABS = [
    {
      value: 'general',
      label: 'General',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <TournamentEditPostPage />,
    },
    {
      value: 'faqs',
      label: 'Faqs',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <TournamentFAQListPage />,
    },
    {
      value: 'sponsors',
      label: 'Sponsors',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <TournamentSponsorsPage />,
    },
    {
      value: 'live_streams',
      label: 'Live Streams',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <TournamentStreamsListPage />,
    },
    {
      value: 'publish_tournament',
      label: 'Publish Tournament',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <TournamentPublishPostPage />,
    },
  ];

  const [currentTab, setCurrentTab] = useState('general');

  return (
    <>
      <Head>
        <title> Dashboard Tournament: ESAN</title>
      </Head>

      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading="Tournaments"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Events',
              href: PATH_DASHBOARD.event.event_tournaments.list(slug as string),
            },
            {
              name: `${(slug as string).split('-').join(' ')}`,
              href: PATH_DASHBOARD.event.event_tournaments.list(slug as string),
            },
            {
              name: `${(tournamentSlug as string).split('-').join(' ')}`,
              href: PATH_DASHBOARD.event.event_tournaments.list(slug as string),
            },
          ]}
          action={
            <Button
              component="a"
              href={PATH_DASHBOARD.event.event_tournaments.new(slug as string)}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Tournament
            </Button>
          }
        />

        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        <Divider sx={{ my: 4 }} />

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 5 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  );
}
