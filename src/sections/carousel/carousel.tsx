import { m } from 'framer-motion';
import { useRef } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
// _mock_
import { _carouselsMembers } from '../../_mock/arrays';
// components
import Image from '../../components/image';
import Carousel, { CarouselArrows } from '../../components/carousel';
import { MotionViewport, varFade } from '../../components/animate';
import { BASE_IMAGE_PATH } from 'src/utils/axios2';
import { ISponsor } from 'src/@types/events';
import Link from 'next/link';

// ----------------------------------------------------------------------

type Props = {
  sponsors: ISponsor[];
};
export default function CarouselEvent({ sponsors }: Props) {
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
    <Container component={MotionViewport} sx={{ pt:4, textAlign: 'center' }}>
      <m.div variants={varFade().inUp}>
        <Typography variant="h2" >
          Event Sponsors
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
            {sponsors.map((sponsor) => (
              <Box
                key={sponsor.id}
                component={m.div}
                variants={varFade().in}
                sx={{ px: 1.5, py: 1}}
              >
                <SponsorCard sponsor={sponsor} />
              </Box>
            ))}
          </Carousel>
        </CarouselArrows>
      </Box>
    </Container>
  );
}

// ----------------------------------------------------------------------
type CardProps = {
  sponsor: ISponsor;
};

function SponsorCard({ sponsor }: CardProps) {
  const { id, sponsor_name,sponsor_link, sponsorship_category, sponsor_banner } = sponsor;

  return (
    <Link href={sponsor_link} style={{ textDecoration: 'none', color: 'white' }} target="_blank">
      <Card key={id}>
        <Typography variant="subtitle1" sx={{ mt: 2, mb: 0.5 }}>
          {sponsor_name}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
          {sponsorship_category}
        </Typography>

        <Box sx={{ px: 1, pb: 2 }}>
          <Image
            alt={sponsor_name}
            src={BASE_IMAGE_PATH + sponsor_banner}
            ratio="1/1"
            sx={{ borderRadius: 2 }}
          />
        </Box>
      </Card>
    </Link>
  );
}
