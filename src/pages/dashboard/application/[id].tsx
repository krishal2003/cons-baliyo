import Head from 'next/head';
import React, { useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
} from '@mui/material';
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
import { useSettingsContext } from 'src/components/settings';
import { useRouter } from 'next/router';
import Iconify from 'src/components/iconify';
import Progression from 'src/components/application/progression';
import Personal from 'src/components/application/personal';
import Other from 'src/components/application/other';

IndividualApplication.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

function IndividualApplication() {
  const [currentTab, setCurrentTab] = useState('personal');

  const TABS = [
    {
      value: 'personal',
      label: 'Personal Details',
      icon: <Iconify icon="material-symbols:person-outline" />,
      component: <Personal />,
    },
    {
      value: 'progression',
      label: 'Application Progression',
      icon: <Iconify icon="mdi:application-edit-outline" />,
      component: <Progression />,
    },
    {
      value: 'other',
      label: 'other',
      icon: <Iconify icon="basil:other-1-solid" />,
      component: <Other />,
    },
  ];

  const router = useRouter();
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Application | ESAN</title>
      </Head>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" sx={{ pl: 1,pb:2, color: '#078DEE' }}>
          Application Details of Anita Paudel:
        </Typography>
        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {TABS.map((tab) => tab.value === currentTab && <Box key={tab.value}>{tab.component}</Box>)}
      </Container>
    </>
  );
}

export default IndividualApplication;
