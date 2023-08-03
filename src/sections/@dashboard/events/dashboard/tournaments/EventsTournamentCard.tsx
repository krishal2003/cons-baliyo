import React, { Dispatch, SetStateAction, useState } from 'react';
import Button from '@mui/material/Button';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
  alpha,
} from '@mui/material';

import { Tournament } from 'src/@types/tournaments';
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
import { fDate } from 'src/utils/formatTime';
import Image from 'src/components/image/Image';
import SvgColor from 'src/components/svg-color/SvgColor';
import Markdown from 'src/components/markdown/Markdown';
import { styled } from '@mui/system';
import Iconify from 'src/components/iconify/Iconify';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ConfirmDialog from 'src/components/confirm-dialog/ConfirmDialog';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

interface TournamentsCardProps {
  tournament: Tournament;
  isDashboard?: boolean;
  refetch: boolean;
  setRefetch: Dispatch<SetStateAction<boolean>>;
}

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

const EventTournamentsCard = ({
  tournament,
  isDashboard,
  refetch,
  setRefetch,
}: TournamentsCardProps) => {
  const {
    tournament_banner,
    tournament_name,
    tournament_start_date,
    tournament_end_date,
    tournament_logo,
    slug: tournament_slug,
  } = tournament;

  const {
    query: { slug },
  } = useRouter();

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const { enqueueSnackbar } = useSnackbar();

  const onDelete = async () => {
    axiosInstance2
      .delete('/delete-tournament/', {
        params: {
          slug: tournament_slug,
        },
      })
      .then((res) => {
        enqueueSnackbar(res.data.success);
        setRefetch(!refetch);
      })
      .catch((error) => console.error(error));
  };
  return (
    <Card sx={{ textAlign: 'center', mb: 2 }}>
      <Box sx={{ position: 'relative' }}>
        <SvgColor
          src="/assets/shape_avatar.svg"
          sx={{
            width: 144,
            height: 62,
            zIndex: 10,
            left: 0,
            right: 0,
            bottom: -26,
            mx: 'auto',
            position: 'absolute',
            color: 'background.paper',
          }}
        />

        <Avatar
          alt={tournament_name}
          src={BASE_IMAGE_PATH + tournament_logo}
          sx={{
            width: 64,
            height: 64,
            zIndex: 11,
            left: 0,
            right: 0,
            bottom: -32,
            mx: 'auto',
            position: 'absolute',
          }}
        />

        <StyledOverlay />

        <Image src={BASE_IMAGE_PATH + tournament_banner} alt={tournament_name} ratio="16/9" />
      </Box>
      <Stack>
        {isDashboard && (
          <Stack spacing={2} direction="row" alignSelf="end">
            <IconButton
              size="small"
              href={PATH_DASHBOARD.event.event_tournaments.tournament_dashboard(
                slug as string,
                `${tournament_slug}`
              )}
              color="info"
            >
              <Iconify icon="material-symbols:edit" width={24} />
            </IconButton>
            <IconButton size="small" onClick={handleOpenConfirm} color="error">
              <Iconify icon="material-symbols:delete" width={24} />
            </IconButton>
          </Stack>
        )}
        <Typography variant="subtitle1" sx={{ mt: 6, mb: 0.5 }}>
          {tournament_name}
        </Typography>
        <Typography
          gutterBottom
          variant="button"
          component="div"
          sx={{
            color: 'text.disabled',
          }}
        >
          {fDate(tournament_start_date)} - {fDate(tournament_end_date)}
        </Typography>
      </Stack>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={<>Are you sure want to delete this tournament?</>}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDelete();
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </Card>
  );
};

export default EventTournamentsCard;
