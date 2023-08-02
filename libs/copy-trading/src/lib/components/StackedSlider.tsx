import { Box, Skeleton, useMediaQuery, useTheme } from '@mui/material';
import { useRef, useEffect } from 'react';
import { ResponsiveContainer, StackedCarousel } from 'react-stacked-center-carousel';
import TopTraderCard from './TopTraderCard';
import { ITrader } from '../@types';
import Image from 'next/image';
interface StackedSliderProps {
  data: ITrader[];
}

export default function StackedSlider(props: StackedSliderProps) {
  const { data } = props;
  const ref = useRef<StackedCarousel>();
  const isLoading = false;
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'));

  useEffect(() => {
    const interval = setInterval(() => {
      if (ref.current) ref.current.goNext();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box ml={30}>
      <Box
        sx={{
          // border: '1px solid red',
          ml: { lg: '30px', xl: '75px' },
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexdirection: 'column',
          padding: 0,
          transform: { xs: 'scale(.60)', sm: 'scale(.75)', md: 'scale(1)' },
        }}
      >
        <header className="App-header">
          {isLoading && (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 6,
              }}
            >
              <Skeleton
                variant="rectangular"
                height={430}
                sx={{ width: '100%', borderRadius: 6 }}
              />
            </Box>
          )}
          {!isLoading && (
            <Box
              sx={{
                height: '430px',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: '10',
                  position: 'relative',
                  top: '235px',
                  left: '-67px',
                  width: '135px',
                  height: '0px',
                  objectFit: 'contain',
                  transformOrigin: 'center center',

                  '@keyframes rotation': {
                    from: {
                      transform: 'rotate(0deg)',
                    },
                    to: {
                      transform: 'rotate(360deg)',
                    },
                  },
                  animation: 'rotation 4s infinite linear',
                }}
              >
                <Image
                  src={'/assets/ctLandingPageRevolvingImage.png'}
                  height={135}
                  width={135}
                  alt="revolving"
                />
              </Box>
              <ResponsiveContainer
                carouselRef={ref}
                render={(parentWidth, carouselRef) => {
                  const currentVisibleSlide = 5;
                  return (
                    <Box
                    >
                      {isMd ? (
                        <StackedCarousel
                          ref={carouselRef}
                          slideComponent={TopTraderCard}
                          slideWidth={860}
                          carouselWidth={860}
                          data={[data[0], data[1], data[2], data[3], data[5]]}
                          currentVisibleSlide={currentVisibleSlide}
                          maxVisibleSlide={5}
                          useGrabCursor
                        />
                      ) : (
                        // for small devices
                        <Box
                        >
                          <StackedCarousel
                            ref={carouselRef}
                            slideComponent={TopTraderCard}
                            slideWidth={860}
                            carouselWidth={860}
                            data={[data[0], data[1], data[2], data[3], data[5]]}
                            currentVisibleSlide={currentVisibleSlide}
                            maxVisibleSlide={5}
                          />
                        </Box>
                      )}
                    </Box>
                  );
                }}
              />
            </Box>
          )}
        </header>
      </Box>
    </Box>
  );
}
