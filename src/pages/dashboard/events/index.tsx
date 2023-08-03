import { useEffect, useCallback, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Grid, Container, Button } from '@mui/material';
// utils
import axiosInstance2 from 'src/utils/axios2';
// routes
import { PATH_DASHBOARD, PATH_PAGE } from '../../../routes/paths';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import { SkeletonPostItem } from 'src/components/skeleton';
import { EventsPostCard } from 'src/sections/@dashboard/events';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import Iconify from 'src/components/iconify/Iconify';
import { EventData } from 'src/@types/events';

EventsPostPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function EventsPostPage() {
  const [events, setEvents] = useState<EventData['event'][]>([]);

  const getAllEvents = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/events');
      setEvents(response.data.events);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getAllEvents();
  }, [getAllEvents]);

  return (
    <>
      <Head>
        <title> Events: | ESAN</title>
      </Head>

      <Container>
        <CustomBreadcrumbs
          heading="Events"
          links={[
            {
              name: 'Home',
              href: '/',
            },
            {
              name: 'Events',
              href: PATH_PAGE.blog.root,
            },
            {
              name: 'Event',
            },
          ]}
          action={
            <Button
              component="a"
              href={PATH_DASHBOARD.event.new}
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              New Event
            </Button>
          }
        />

        {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <EventSearch />
          <EventSort sortBy={sortBy} sortOptions={SORT_OPTIONS} onSort={handleChangeSortBy} />
        </Stack> */}

        <Grid container spacing={3} sx={{ mb: 2 }}>
          {(!events.length ? [...Array(12)] : events).map((event, index) =>
            event ? (
              <Grid key={event.id} item xs={12} sm={6} md={4}>
                <EventsPostCard event={event} index={index} isDashboard />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          )}
        </Grid>
      </Container>
    </>
  );
}
