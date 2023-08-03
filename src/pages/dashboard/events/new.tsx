// next
import Head from 'next/head';
// @mui
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// layouts
import DashboardLayout from '../../../layouts/dashboard';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import EventNewPostForm from 'src/sections/@dashboard/events/EventNewPostForm';

// ----------------------------------------------------------------------

BlogNewPostPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function BlogNewPostPage() {
  return (
    <>
      <Head>
        <title> Event: New Event | ESAN</title>
      </Head>

      <Container>
        <CustomBreadcrumbs
          heading="Create a new event"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            {
              name: 'Event',
              href: PATH_DASHBOARD.event.root,
            },
            {
              name: 'Create',
            },
          ]}
        />

        <EventNewPostForm />
      </Container>
    </>
  );
}
