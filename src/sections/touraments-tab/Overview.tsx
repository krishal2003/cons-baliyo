/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react';
import { Box, Typography } from '@mui/material';
import Markdown from 'src/components/markdown/Markdown';
import TournamentSponsor from '../tournaments/TournamentSponsor';
import { Tournament } from 'src/@types/tournaments';

type Props = {
  tournament: Tournament;
};
function Overview({ tournament }: Props) {
  return (
    <>
      <Box
        gap={5}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
        sx={{ my: 3, p: 3 }}
      >
        <Typography variant="h6" color="text.secondary">
          ENTRY FEE <br />{' '}
          <Typography color="textPrimary">Rs. {tournament.tournament_fee}</Typography>
        </Typography>{' '}
        <Typography variant="h6" color="text.secondary">
          LOCATION <br /> <Typography color="textPrimary">{tournament.location}</Typography>
        </Typography>{' '}
        <Typography variant="h6" color="text.secondary">
          MODE <br /> <Typography color="textPrimary">{tournament.tournament_mode}</Typography>
        </Typography>{' '}
        <Typography variant="h6" color="text.secondary">
          ENTRY DEADLINE <br />
          <Typography color="textPrimary">{tournament.registration_closing_date}</Typography>
        </Typography>{' '}
        <Typography variant="h6" color="text.secondary">
          GAME DATE <br />{' '}
          <Typography color="textPrimary">{tournament.tournament_start_date}</Typography>
        </Typography>{' '}
        {/* <Typography variant="h6" color="text.secondary">
          PLATFORM <br /> <Typography color="textPrimary">{tournament.game.game_type}</Typography>
        </Typography>{' '} */}
      </Box>
      <Box>
        <Typography variant="h4">{tournament.tournament_name}</Typography>
        <Markdown
          children={tournament.tournament_description}
          sx={{
            color: 'text.secondary',
            mb: 0,
          }}
        />
      </Box>
      <Box sx={{ pt: 5 }}>
        <TournamentSponsor />
      </Box>
    </>
  );
}

export default Overview;
