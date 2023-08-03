import { useCallback, useEffect, useRef, useState } from 'react';
// @mui
import { alpha, useTheme } from '@mui/material/styles';
import { Box, Paper, Link, CardContent } from '@mui/material';
// utils
// components
import { bgGradient } from '../../utils/cssStyles';
import Image from 'src/components/image/Image';
import TextMaxLine from 'src/components/text-max-line/TextMaxLine';
import Carousel, { CarouselArrows } from 'src/components/carousel';
import { EventData } from 'mapbox-gl';
import { useRouter } from 'next/router';
import axiosInstance2, { BASE_IMAGE_PATH } from 'src/utils/axios2';

// ----------------------------------------------------------------------

type Props = {
  data: {
    id: string;
    title: string;
    image: string;
    description: string;
  }[];
};

export default function EventCarouselSponsor({ data }: Props) {
  const carouselRef = useRef<Carousel | null>(null);

  const theme = useTheme();

  const carouselSettings = {
    slidesToShow: 4,
    centerMode: true,
    centerPadding: '60px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' },
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
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <CarouselArrows filled onNext={handleNext} onPrevious={handlePrev}>
        <Carousel ref={carouselRef} {...carouselSettings}>
          {data.map((item) => (
            <Box key={item.id} sx={{ px: 1 }}>
              <CarouselItem item={item} />
            </Box>
          ))}
        </Carousel>
      </CarouselArrows>
    </Box>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  title: string;
  description: string;
  image: string;
};

function CarouselItem({ item }: { item: CarouselItemProps }) {
  const theme = useTheme();
  const {
    query: { slug },
  } = useRouter();

  const [sponsors, setSponsors] = useState<EventData['sponsors']>([]);

  const getEvent = useCallback(async () => {
    try {
      const response = await axiosInstance2.get('/event-detail', {
        params: { slug },
      });

      setSponsors(response.data.sponsors);
    } catch (error) {
      console.error(error);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) {
      getEvent();
    }
  }, [getEvent, slug]);

  return (
    <Box>
      {sponsors &&
        sponsors.map(
          (sponsor: {
            sponsor_name: string;
            sponsor_banner: string;
            sponsorship_category: string;
            sponsor_link: string;
          }) => (
            <Link href={sponsor.sponsor_link} target="_blank">
              <Paper
                sx={{
                  borderRadius: 2,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <Image
                  alt={sponsor.sponsor_name}
                  src={BASE_IMAGE_PATH + sponsor.sponsor_banner}
                  ratio="3/4"
                />
                <CardContent
                  sx={{
                    bottom: 0,
                    zIndex: 9,
                    width: '100%',
                    textAlign: 'left',
                    position: 'absolute',
                    color: 'common.white',
                    ...bgGradient({
                      direction: 'to top',
                      startColor: `${theme.palette.grey[900]} 25%`,
                      endColor: `${alpha(theme.palette.grey[900], 0)} 100%`,
                    }),
                  }}
                >
                  <TextMaxLine variant="h4" paragraph>
                    {sponsor.sponsor_name}{' '}
                  </TextMaxLine>
                  {sponsor.sponsorship_category}{' '}
                </CardContent>
              </Paper>
            </Link>
          )
        )}
    </Box>
  );
}
