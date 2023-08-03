import { m } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { Box, Stack, Card, Button, Container, Typography } from '@mui/material';
// _mock_
import { _carouselsMembers } from '../../_mock/arrays';
// components
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import Carousel, { CarouselArrows } from '../../components/carousel';
import { MotionViewport, varFade } from '../../components/animate';
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';
import { ITeam } from 'src/@types/team';
import Link from 'next/link';

// ----------------------------------------------------------------------

export default function AboutTeam() {
  const [teamList, setTeamList] = useState<ITeam[]>([]);

  const getTeamList = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/ourteam-list/');
      setTeamList(response.data.teams);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getTeamList();
  }, [getTeamList]);

  const carouselRef = useRef<Carousel>(null);

  const theme = useTheme();

  const carouselSettings = {
    infinite: false,
    arrows: false,
    slidesToShow: 4,
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center' }}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h2" sx={{ my: 3 }}>
          Great team is the key
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          sx={{
            mx: 'auto',
            maxWidth: 640,
            color: 'text.secondary',
          }}
        >
          ESAN will provide you support if you have any problems, our support team will reply within
          a day.
        </Typography>
      </m.div>

      <Box sx={{ position: 'relative' }}>
        <CarouselArrows
          filled
          shape="rounded"
          onNext={handleNext}
          onPrevious={handlePrev}
          leftButtonProps={{
            sx: {
              left: 24,
              ...(_carouselsMembers.length < 5 && { display: 'none' }),
            },
          }}
          rightButtonProps={{
            sx: {
              right: 24,
              ...(_carouselsMembers.length < 5 && { display: 'none' }),
            },
          }}
        >
          <Carousel ref={carouselRef} {...carouselSettings}>
            {teamList.map((member) => (
              <Box
                key={member.id}
                component={m.div}
                variants={varFade().in}
                sx={{ px: 1.5, py: 10 }}
              >
                <MemberCard member={member} />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------
type Props = {
  member: ITeam;
};

function MemberCard({ member }: Props) {
  const {
    name,
    post,
    image,
    discord_link,
    facebook_link,
    instagram_link,
    linkedin_link,
    twitch_link,
    twitter_link,
  } = member;

  return (
    <Card key={name}>
      <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
        {name}
      </Typography>

      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        {post}
      </Typography>

      <Box sx={{ px: 1 }}>
        <Image alt={name} src={BASE_IMAGE_PATH + image} ratio="1/1" sx={{ borderRadius: 2 }} />
      </Box>
      {SocialsDisplay(
        facebook_link,
        instagram_link,
        twitter_link,
        discord_link,
        twitch_link,
        linkedin_link
      )}
    </Card>
  );
}
export function SocialsDisplay(
  facebook_link?: string,
  instagram_link?: string,
  twitter_link?: string,
  discord_link?: string,
  twitch_link?: string,
  linkedin_link?: string
) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center" gap={2} sx={{ p: 2 }}>
      {facebook_link && (
        <Link href={`${facebook_link}`} target="_blank" rel="noopener">
          <Box
            sx={{
              color: '#1877F2',
              '&:hover': {
                bgcolor: alpha('#1877F2', 0.08),
              },
            }}
          >
            <Iconify icon="eva:facebook-fill" />
          </Box>
        </Link>
      )}
      {instagram_link && (
        <Link href={`${instagram_link}`} target="_blank" rel="noopener">
          <Box
            sx={{
              color: '#E02D69',
              '&:hover': {
                bgcolor: alpha('#E02D69', 0.08),
              },
            }}
          >
            <Iconify icon="ant-design:instagram-filled" />
          </Box>
        </Link>
      )}
      {twitter_link && (
        <Link href={`${twitter_link}`} target="_blank" rel="noopener">
          <Box
            sx={{
              color: '#00AAEC',
              '&:hover': {
                bgcolor: alpha('#00AAEC', 0.08),
              },
            }}
          >
            <Iconify icon="eva:twitter-fill" />
          </Box>
        </Link>
      )}
      {discord_link && (
        <Link href={`${discord_link}`} target="_blank" rel="noopener">
          <Box
            sx={{
              color: '#5B67EA',
              '&:hover': {
                bgcolor: alpha('#5B67EA', 0.08),
              },
            }}
          >
            <Iconify icon="ic:baseline-discord" />
          </Box>
        </Link>
      )}
      {twitch_link && (
        <Link href={`${twitch_link}`} target="_blank" rel="noopener">
          <Box
            sx={{
              color: '#A541F6',
              '&:hover': {
                bgcolor: alpha('#A541F6', 0.08),
              },
            }}
          >
            <Iconify icon="mdi:twitch" />
          </Box>
        </Link>
      )}
      {linkedin_link && (
        <Link href={`${linkedin_link}`} target="_blank" rel="noopener">
          <Box
            sx={{
              color: '#007EBB',
              '&:hover': {
                bgcolor: alpha('#007EBB', 0.08),
              },
            }}
          >
            <Iconify icon="eva:linkedin-fill" />
          </Box>
        </Link>
      )}
    </Stack>
  );
}
