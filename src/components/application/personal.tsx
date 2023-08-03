import { Box, Card, Container } from '@mui/material';
import React from 'react';
import { _applicationAbout } from 'src/_mock/arrays';
import { ProfileCover, Profile } from 'src/sections/@dashboard/user/profile';
import { useSettingsContext } from '../settings';



function Personal() {
  const { themeStretch } = useSettingsContext();
  return (
    <Box sx={{ pt: 3 }}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card
          sx={{
            mb: 3,
            height: 280,
            position: 'relative',
          }}
        >
          <ProfileCover
            name={_applicationAbout.name}
            cover={_applicationAbout.cover}
          />
        </Card>

        {/* <Profile info={_applicationAbout} /> */}
      </Container>
    </Box>
  );
}

export default Personal;
