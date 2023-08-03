import { useEffect, useState, useCallback } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Container, Typography } from '@mui/material';
// sections
import axiosInstance2 from 'src/utils/axios2';
import { Tournament } from 'src/@types/tournaments';
import TournamentNewPostForm from 'src/sections/@dashboard/events/dashboard/tournaments/TournamentNewPostForm';
import { SkeletonPostDetails } from 'src/components/skeleton';

// ----------------------------------------------------------------------

export default function TournamentEditPostPage() {
  const {
    query: { tournamentSlug },
  } = useRouter();

  const [tournament, setTournament] = useState<Tournament | undefined>(undefined);

  const [loadingPost, setLoadingPost] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const getPost = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/get-tournament-detail/', {
        params: { slug: tournamentSlug },
      });

      setTournament(response.data.tournament);
      setLoadingPost(false);
    } catch (error) {
      console.error(error);
      setLoadingPost(false);
      setErrorMsg(error.message);
    }
  }, [tournamentSlug]);

  useEffect(() => {
    if (tournamentSlug) {
      getPost();
    }
  }, [getPost, tournamentSlug]);

  return (
    <Container maxWidth={false}>
      {errorMsg && !loadingPost && <Typography variant="h6">404 {errorMsg}</Typography>}

      {loadingPost && <SkeletonPostDetails />}

      <TournamentNewPostForm isEdit currentTournament={tournament} />
    </Container>
  );
}
