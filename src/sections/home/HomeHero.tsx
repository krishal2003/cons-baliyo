import { m, useScroll } from 'framer-motion';
import { useEffect, useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Button, Box, Container, Typography, Stack, Grid, IconButton } from '@mui/material';
// routes
import { _games, _socials, _tournamentFeatured } from 'src/_mock/arrays';
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import { textGradient, bgGradient } from '../../utils/cssStyles';
// theme
import { secondaryFont } from '../../theme/typography';
// components
import Iconify from '../../components/iconify';
import { MotionContainer, varFade } from '../../components/animate';
import TournamentFeatured from './TournamentFeatured';
import Games from './Games';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  ...bgGradient({
    color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    position: 'fixed',
  },
}));

const StyledDescription = styled('div')(({ theme }) => ({
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  padding: theme.spacing(15, 0),
  height: '100%',
}));

const StyledGradientText = styled(m.h1)(({ theme }) => ({
  ...textGradient(
    `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 25%, ${theme.palette.primary.main} 50%, ${theme.palette.warning.main} 75%, ${theme.palette.primary.main} 100%`
  ),
  backgroundSize: '400%',
  fontFamily: secondaryFont.style.fontFamily,
  fontSize: `${64 / 16}rem`,
  textAlign: 'center',
  lineHeight: 1,
  padding: 0,
  marginTop: 8,
  marginBottom: 24,
  letterSpacing: 8,
  [theme.breakpoints.up('md')]: {
    fontSize: `${96 / 16}rem`,
  },
}));

// ----------------------------------------------------------------------

export default function HomeHero() {
  const { scrollYProgress } = useScroll();

  const [hide, setHide] = useState(false);

  useEffect(
    () =>
      scrollYProgress.on('change', (scrollHeight) => {
        if (scrollHeight > 0.8) {
          setHide(true);
        } else {
          setHide(false);
        }
      }),
    [scrollYProgress]
  );

  return (
    <>
      <StyledRoot sx={{ ...(hide && { opacity: 0 }) }}>
        <Container component={MotionContainer}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Description />
            </Grid>

            <Grid item xs={12} md={8}>
              <Content />
            </Grid>
          </Grid>
        </Container>
      </StyledRoot>

      <Box sx={{ height: { md: '100vh' } }} />
    </>
  );
}

// ----------------------------------------------------------------------

function Description() {
  return (
    <StyledDescription>
      <m.div variants={varFade().in}>
        <Typography variant="h2">
          Elevate your <br /> gaming with
        </Typography>
      </m.div>

      <m.div variants={varFade().in}>
        <StyledGradientText
          animate={{ backgroundPosition: '200% center' }}
          transition={{
            repeatType: 'reverse',
            ease: 'linear',
            duration: 20,
            repeat: Infinity,
          }}
        >
          ESAN
        </StyledGradientText>
      </m.div>
      <m.div variants={varFade().in}>
        <Typography variant="body2">
          Experience the ultimate gaming community. Join now for thrilling games, competitions, and
          a vibrant community of fellow gamers!
        </Typography>
      </m.div>
      <br />
      <m.div variants={varFade().in}>
        <Stack spacing={1.5} direction={{ xs: 'column-reverse', sm: 'row' }} sx={{ mb: 5 }}>
          <Stack alignItems="center" spacing={2}>
            <Button
              component={NextLink}
              href="/tournaments"
              color="inherit"
              size="large"
              variant="contained"
              sx={{
                bgcolor: 'text.primary',
                color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                '&:hover': {
                  bgcolor: 'text.primary',
                },
              }}
            >
              Browse Tournaments
            </Button>
          </Stack>

          <Button
            color="inherit"
            size="large"
            variant="outlined"
            href={PATH_DASHBOARD.root}
            sx={{ borderColor: 'text.primary' }}
          >
            Join Us
          </Button>
        </Stack>
      </m.div>
      <Stack spacing={3} sx={{ textAlign: 'left', opacity: 0.48 }}>
        <m.div variants={varFade().in}>
          <Typography variant="overline">Connect with us!</Typography>
        </m.div>

        <Stack
          spacing={1}
          direction="row"
          justifyContent={{ xs: 'center', md: 'flex-start' }}
          sx={{
            mt: 5,
            mb: { xs: 5, md: 0 },
          }}
        >
          {_socials.map((social) => (
            <IconButton key={social.name} href={social.path} target="_blank" rel="noopener">
              <Iconify icon={social.icon} />
            </IconButton>
          ))}
        </Stack>

        {/* <Stack spacing={2} direction="row" justifyContent="center" alignItems="center">
          {['facebook','instagram',  'twitter', 'youtube',].map((platform) => (
            <m.div key={platform} variants={varFade().in}>
              <SvgColor src={`/assets/icons/platforms/ic_${platform}.svg`} />
            </m.div>
          ))}
        </Stack> */}
      </Stack>
    </StyledDescription>
  );
}

// ----------------------------------------------------------------------

function Content() {
  return (
    <Grid
      container
      spacing={3}
      sx={{
        py: { xs: 4, md: 10 },
      }}
    >
      <Grid item xs={12}>
        <TournamentFeatured list={_tournamentFeatured} />
      </Grid>
      <Grid item xs={12}>
        <Games title="Top Games" list={_games.slice(0, 4)} />
      </Grid>
    </Grid>
  );
}
