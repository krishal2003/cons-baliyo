// next
import Head from 'next/head';
// @mui
import { Container, Tabs, Tab, Box, Divider, Button } from '@mui/material';
// layouts
import DashboardLayout from '../../../../../layouts/dashboard';
// sections
import { useRouter } from 'next/router';
import Iconify from 'src/components/iconify/Iconify';
import { useState } from 'react';
import NewEditEventPage from 'src/sections/@dashboard/events/dashboard/edit';
import FAQListPage from 'src/sections/@dashboard/events/dashboard/event-faqs';
import EventSponsorsPage from 'src/sections/@dashboard/events/dashboard/event-sponsors';
import EventsTournaments from 'src/sections/@dashboard/events/dashboard/event-tournaments';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import { PATH_DASHBOARD } from 'src/routes/paths';

// ----------------------------------------------------------------------

EventsDashboard.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function EventsDashboard() {
  const {
    query: { slug },
  } = useRouter();

  const TABS = [
    {
      value: 'general',
      label: 'General',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <NewEditEventPage />,
    },
    {
      value: 'faqs',
      label: 'Faqs',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <FAQListPage />,
    },
    {
      value: 'sponsors',
      label: 'Sponsors',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <EventSponsorsPage />,
    },
    {
      value: 'tournaments',
      label: 'Tournaments',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <EventsTournaments />,
    },
  ];

  const [currentTab, setCurrentTab] = useState('general');

  return (
    <>
      <Head>
        <title> Dashboard Event: ESAN</title>
      </Head>

      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading="Events"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Events',
              href: PATH_DASHBOARD.event.events,
            },
            {
              name: `${(slug as string).split('-').join(' ')}`,
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
