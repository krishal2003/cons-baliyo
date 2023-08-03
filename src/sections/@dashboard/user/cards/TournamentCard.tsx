import {
  Card,
  Avatar,
  Typography,
  Divider,
  alpha,
  styled,
  Box,
  Button,
  CardActions,
} from '@mui/material';
import { ITournamentCard } from 'src/@types/user';
import SvgColor from 'src/components/svg-color';
import { BASE_IMAGE_PATH } from 'src/utils/axios2';
import Image from '../../../../components/image';
import Link from 'next/link';

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

type Props = {
  member: ITournamentCard;
};

export default function TournamentCard({ member }: Props) {
  const {
    slug,
    id,
    tournament_name,
    tournament_logo,
    game: { game_name },
    tournament_banner,
    tournament_mode,
    tournament_participants,
    tournament_fee,
    no_of_participants,
    maximum_no_of_participants,
    tournament_status,
  } = member;

  return (
    <div>
      <Link
        href={`tournaments/${slug}`}
        key={id}
        style={{ textDecoration: 'none', color: 'white' }}
      >
        <Box>
          <Card key={id} sx={{ textAlign: 'center', mb: 2, textDecoration: 'none' }}>
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
            <Typography
              variant="subtitle1"
              sx={{ mt: 3, mb: 0.5, pt: 2, textDecoration: 'none', color: 'white' }}
            >
              {tournament_name}
            </Typography>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} sx={{ py: 1 }}>
              <div>
                <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                  Mode
                </Typography>
                <Typography variant="button">{tournament_mode}</Typography>
              </div>

              <div>
                <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                  Participant Type
                </Typography>

                <Typography variant="button">{tournament_participants}</Typography>
              </div>

              <div>
                <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                  Fee
                </Typography>
                <Typography variant="button">{tournament_fee}</Typography>
              </div>
              <div>
                <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                  Participant Number
                </Typography>
                <Typography variant="button">
                  {no_of_participants} / {maximum_no_of_participants}
                </Typography>
              </div>
              <div>
                <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                  Status
                </Typography>
                <Typography variant="button">{tournament_status}</Typography>
              </div>
              <div>
                <Typography variant="caption" component="div" sx={{ color: 'text.disabled' }}>
                  Game
                </Typography>
                <Typography variant="button">{game_name}</Typography>
              </div>
            </Box>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <CardActions sx={{ display: 'flex', gap: 2 }}>
                <Link href="coming-soon">
                  <Button variant="contained" sx={{ pl: 4, pr: 4 }}>
                    Join
                  </Button>
                </Link>
              </CardActions>
            </Box>
          </Card>
        </Box>
      </Link>
    </div>
  );
}
