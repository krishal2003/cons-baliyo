// next
import Head from 'next/head';
// @mui
import { Box, Button, Container, Grid, Typography } from '@mui/material';
// layouts
import MainLayout from '../layouts/main';
// components
import ScrollProgress from '../components/scroll-progress';
// sections
import { HomeHero, HomeMinimal, RecentPosts } from '../sections/home';
import { AboutTestimonials } from 'src/sections/about';
import { FaqsList } from '../sections/faqs';
import { _analyticPost } from 'src/_mock/arrays';
import NewsUpdate from 'src/sections/News/Newsupdate';
import { ContactForm } from 'src/sections/contact';
import TournamentStatus from 'src/sections/tournament-status/tournament-status';
import Link from 'next/link';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Head>
        <title> Consultancy | ESAN</title>
      </Head>

      <ScrollProgress />

      <Box textAlign='center' sx={{pt:15}}>
        <Link href="/dashboard/application">
          <Button variant='contained'> Go to Dashboard</Button>
        </Link>
      </Box>
    </>
  );
}
