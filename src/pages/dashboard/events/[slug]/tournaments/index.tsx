import { useEffect, useCallback, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Grid, Container } from '@mui/material';
// utils
import axiosInstance2 from 'src/utils/axios2';
// routes
import { PATH_PAGE } from '../../../../../routes/paths';
// components
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import { SkeletonPostItem } from 'src/components/skeleton';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useRouter } from 'next/router';
import { Tournament } from 'src/@types/tournaments';
import EventTournamentsCard from 'src/sections/@dashboard/events/dashboard/tournaments/EventsTournamentCard';

EventsTournamentPostPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

// ----------------------------------------------------------------------

export default function EventsTournamentPostPage() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  const {
    query: { slug },
  } = useRouter();

  const [refetch, setRefetch] = useState(false);

  const getAllTournaments = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/event-tournaments', {
        params: {
          slug,
        },
      });
      setTournaments(response.data.tournaments);
    } catch (error) {
      console.error(error);
    }
  }, [slug]);

  useEffect(() => {
    getAllTournaments();
  }, [getAllTournaments, refetch]);

  return (
    <>
      <Head>
        <title> Tournaments: | ESAN</title>
      </Head>

      <Container>
        <CustomBreadcrumbs
          heading="Tournaments"
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
              name: 'Tournaments',
            },
          ]}
        />

        {/* <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <EventSearch />
          <EventSort sortBy={sortBy} sortOptions={SORT_OPTIONS} onSort={handleChangeSortBy} />
        </Stack> */}

        <Grid container spacing={3} sx={{ mb: 2 }}>
          {(!tournaments.length ? [...Array(12)] : tournaments).map(
            (tournament: Tournament, index) =>
              tournament ? (
                <Grid key={tournament.id} item xs={12} sm={6} md={4}>
                  <EventTournamentsCard
                    tournament={tournament}
                    isDashboard
                    setRefetch={setRefetch}
                    refetch={refetch}
                  />
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
