/* eslint-disable import/no-cycle */
import { useCallback, useEffect, useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Container, Tab, Tabs, Box } from '@mui/material';
// routes
import DashboardLayout from 'src/layouts/dashboard/DashboardLayout';
// components
import Iconify from 'src/components/iconify/Iconify';
import { useSettingsContext } from 'src/components/settings';
// sections
import {
  AccountGeneral,
  AccountChangePassword,
} from 'src/sections/@dashboard/userlist/account';
import axiosInstance2 from 'src/utils/axios2';
import { IUserAccountList } from 'src/@types/user';
import LoadingScreen from 'src/components/loading-screen/LoadingScreen';
import BankDetails from 'src/sections/@dashboard/BankDetails';

// ----------------------------------------------------------------------

UserAccountPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
export type SocialMedia = {
  facebook_link: string;
  twitter_link: string;
  youtube_link: string;
  website_link: string;
  discord_link: string;
  linkedin_link: string;
  twitch_link: string;
  instagram_link: string;
  reddit_link: string;
};
export default function UserAccountPage() {
  const { themeStretch } = useSettingsContext();

  const [currentTab, setCurrentTab] = useState('general');

  const [currentUser, setCurrentUser] = useState<IUserAccountList | undefined>(undefined);

  const [loadingUser, setLoadingUser] = useState(true);

  const [errorMsg, setErrorMsg] = useState(null);

  const getUser = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/get-user-profile-detail/');

      setCurrentUser(response.data.user);
      setLoadingUser(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
      setErrorMsg(error.message);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const TABS = [
    {
      value: 'general',
      label: 'General',
      icon: <Iconify icon="ic:round-account-box" />,
      component: <AccountGeneral currentUser={currentUser} />,
    },
    {
      value: 'bank_details',
      label: 'Bank Details',
      icon: (
        <Iconify
          icon="guidance:bank" />
      ),
      component: (
        <BankDetails/>
      ),
    },
    {
      value: 'change_password',
      label: 'Change password',
      icon: <Iconify icon="ic:round-vpn-key" />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <>
      <Head>
        <title>  Settings | ESAN</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'lg'}>
       

        {loadingUser && <LoadingScreen />}

        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {!loadingUser &&
          TABS.map(
            (tab) =>
              tab.value === currentTab && (
                <Box key={tab.value} sx={{ mt: 5 }}>
                  {tab.component}
                </Box>
              )
          )}
      </Container>
    </>
  );
}
