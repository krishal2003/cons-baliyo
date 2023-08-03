// @mui
import { Grid } from '@mui/material';
// sections
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { Tournament } from 'src/@types/tournaments';
import axiosInstance2 from 'src/utils/axios2';
import EventTournamentsCard from './tournaments/EventsTournamentCard';
import { SkeletonPostItem } from 'src/components/skeleton';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function EventsTournaments() {
  const {
    query: { slug },
  } = useRouter();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
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
    <Grid container spacing={3} sx={{ mb: 2 }}>
      {(!tournaments.length ? [...Array(12)] : tournaments).map((tournament: Tournament, index) =>
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
  );
}
