// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// @types
// components
import Iconify from '../../../../../components/iconify';
import {  IApplicationProfileAbout } from 'src/@types/application';

// ----------------------------------------------------------------------

const StyledIcon = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

export default function ProfileAbout({
  bio,
  country,
  phoneNumber,
  email,
  role,
  city,
  school,
}: IApplicationProfileAbout) {
  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{bio}</Typography>

        <Stack direction="row">
          <StyledIcon icon="eva:pin-fill" />

          <Typography variant="body2">
            Lives at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {city}, {country}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:baseline-phone" />
          <Typography variant="body2">{phoneNumber}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="eva:email-fill" />
          <Typography variant="body2">{email}</Typography>
        </Stack>

        <Stack direction="row">
          <StyledIcon icon="ic:round-business-center" />

          <Typography variant="body2">
            Studied at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {school}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
