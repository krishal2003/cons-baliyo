import { useEffect, useState, useCallback } from 'react';
// next
import Head from 'next/head';
import { useRouter } from 'next/router';
// @mui
import {
  Stack,
  Container,
  Typography,
  CardContent,
  Card,
  Grid,
  Divider,
  Button,
  Box,
} from '@mui/material';
// layouts
import MainLayout from 'src/layouts/main/MainLayout';
// routes
// components
import Markdown from '../../../../components/markdown';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
// sections
import axiosInstance2 from 'src/utils/axios2';
import { EventFaqsList, EventHero } from 'src/sections/@dashboard/events';
import { EventData } from 'src/@types/events';
import Iconify from 'src/components/iconify/Iconify';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useSnackbar } from 'notistack';
import CarouselEvent from 'src/sections/carousel/carousel';

// ----------------------------------------------------------------------

EventPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function EventPage() {
  const {
    query: { eventSlug },
  } = useRouter();

  const [event, setEvent] = useState<EventData['event'] | null>(null);
  const [faqs, setFaqs] = useState<EventData['faqs']>([]);
  const [sponsors, setSponsors] = useState<EventData['sponsors']>([]);

  const [loadingEvent, setLoadingEvent] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const getEvent = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/event-detail', {
        params: { slug: eventSlug },
      });

      setEvent(response.data.event);
      setFaqs(response.data.faqs);
      setSponsors(response.data.sponsors);
      setLoadingEvent(false);
    } catch (error) {
      console.error(error);
      setLoadingEvent(false);
      setErrorMsg(error.message);
    }
  }, [eventSlug]);

  useEffect(() => {
    if (eventSlug) {
      getEvent();
    }
  }, [getEvent, eventSlug]);

  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const handleEditRow = () => {
    axiosInstance2
      .post(`/verify-event/?slug=${eventSlug}`)
      .then((res) => {
        enqueueSnackbar('Done', { variant: 'success' });
        router.push(PATH_DASHBOARD.event.all_events.list);
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar('Error Verifying', { variant: 'error' });
      });
  };

  return (
    <>
      <Head>
        <title>{`Event: ${event?.event_name || ''} | ESAN`}</title>
      </Head>

      <Container sx={{ mb: 3 }}>
        <CustomBreadcrumbs
          heading="Event Details"
          links={[
            {
              name: event?.event_name,
            },
          ]}
          action={
            <Button
              variant="contained"
              onClick={handleEditRow}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Verify Event
            </Button>
          }
        />
        <Grid spacing={2}>
          <Grid item xs={12} md={8}>
            {event && (
              <Stack
                sx={{
                  borderRadius: 2,
                  boxShadow: (theme) => ({
                    md: theme.customShadows.card,
                  }),
                }}
                spacing={3}
              >
                <EventHero event={event} />

                <Box sx={{ pt: 3 }}>
                  <CarouselEvent sponsors={sponsors} />
                </Box>
                <Markdown
                  children={event.event_description}
                  sx={{
                    px: { md: 5 },
                  }}
                />
              </Stack>
            )}
            <Divider sx={{ my: 2 }} />
          </Grid>
        </Grid>

        {errorMsg && !loadingEvent && <Typography variant="h6">404 {errorMsg}</Typography>}

        {/* {loadingEvent && <SkeletonPostDetails />}
        <TournamentBelowHero />
        <Divider sx={{ my: 2 }} /> */}

        <Typography variant="h3">FAQS</Typography>
        <Card>
          <CardContent>
            <EventFaqsList faqs={faqs} />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
