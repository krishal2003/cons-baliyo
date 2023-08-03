import Head from 'next/head';
import { Container } from '@mui/material';
import { PATH_DASHBOARD } from '../../../../../routes/paths';
import DashboardLayout from '../../../../../layouts/dashboard';
import CustomBreadcrumbs from '../../../../../components/custom-breadcrumbs';
import TournamentNewPostForm from 'src/sections/@dashboard/events/dashboard/tournaments/TournamentNewPostForm';
import { useRouter } from 'next/router';

TournamentNewPostPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function TournamentNewPostPage() {
  const {
    query: { id },
  } = useRouter();
  return (
    <>
      <Head>
        <title>Tournament: New Tournament | ESAN</title>
      </Head>

      <Container>
        <CustomBreadcrumbs
          heading="Create a new tournament"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Tournament',
              href: PATH_DASHBOARD.event.event_tournaments.list(id as string),
            },
            {
              name: 'Create',
            },
          ]}
        />

        <TournamentNewPostForm />
      </Container>
    </>
  );
}
