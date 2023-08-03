import { Container } from '@mui/system';
import React, { useCallback, useEffect, useState } from 'react';
import { TournamentCard } from '../@dashboard/user/cards';
import TournamentsGames from './TournamentsGames';
import TournamentsStreaming from './TournamentsStreaming';
import TournamentsSubmit from './TournamentsSubmit';
import { Box } from '@mui/material';
import axiosInstance2 from 'src/utils/axios2';
import { ITournamentCard } from 'src/@types/user';
import { m } from 'framer-motion';

function TournamentBelowHero() {
  const [tournamentList, setTournamentList] = useState<ITournamentCard[]>([]);

  const getTournamentList = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/all-tournaments/');
      setTournamentList(response.data.tournaments);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getTournamentList();
  }, [getTournamentList]);

  return (
    <Container sx={{ pt: 1, pb: 10, position: 'relative' }}>
      <Box
        gap={3}
        display="grid"
        alignItems="center"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        sx={{ pt: 2 }}
      >
        <TournamentsGames /> <TournamentsStreaming />
        <TournamentsSubmit />
      </Box>
      <Box
        component={m.div}
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{ pt: 5, pb: 2 }}
      >
        {tournamentList.map((member) => (
        
            <TournamentCard member={member} />
        ))}
      </Box>
    </Container>
  );
}

export default TournamentBelowHero;
