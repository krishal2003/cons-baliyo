// @mui
import { Grid } from '@mui/material';
// @types
import { IApplicationProfile } from '../../../../../@types/user';
//
import ProfileAbout from './ProfileAbout';
import ProfileSocialInfo from './ProfileSocialInfo';
import Academics from 'src/components/application/academics';

// ----------------------------------------------------------------------

type Props = {
  info: IApplicationProfile;
};


export default function Profile({ info }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <ProfileAbout
          bio={info.bio}
          name={info.name}
          country={info.country}
          city={info.city}
          phoneNumber={info.phoneNumber}
          email={info.email}
          role={info.role}
          course={info.course}
          company={info.company}
          school={info.school}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        {/* <ProfileSocialInfo socialLinks={info.socialLinks} /> */}
        {/* <Academics  academics={info.academics}  /> */}
      </Grid>
    </Grid>
  );
}
