import React from 'react';
import { Box } from '@mui/material';
import { ResponsiveContainer, StackedCarousel } from 'react-stacked-center-carousel';

export const data = [
  {
    cover: '/assets/launchpad-drops/pixels.gif',
    title: 'Interstaller',
  },
  {
    cover: '/assets/launchpad-drops/1.png',
    title: 'Inception',
  },
  {
    cover: '/assets/launchpad-drops/3.png',
    title: 'Blade Runner 2049',
  },
  {
    cover: '/assets/nft/4.png',
    title: 'Icon man 3',
  },
  {
    cover: '/assets/nft/5.png',
    title: 'Venom',
  },
];
export default function StackedSlider() {
  const ref = React.useRef();
  return (
    <Box>
      <div className="App">
        <header className="App-header">
          <ResponsiveContainer
            carouselRef={ref}
            render={(parentWidth, carouselRef) => {
              let currentVisibleSlide = 5;
              return (
                <StackedCarousel
                  ref={carouselRef}
                  slideComponent={Card}
                  slideWidth={parentWidth < 800 ? parentWidth - 100 : 600}
                  carouselWidth={parentWidth}
                  data={data}
                  currentVisibleSlide={currentVisibleSlide}
                  maxVisibleSlide={5}
                  useGrabCursor
                />
              );
            }}
          />
        </header>
      </div>
    </Box>
  );
}

export const Card = React.memo(function ({
  data,
  dataIndex,
}: {
  data: [{ cover: string; title: string }];
  dataIndex: number;
}) {
  const { cover } = data[dataIndex];
  return (
    <div
      style={{
        width: '100%',
        height: 600,
        margin: 'auto',
        userSelect: 'none',
      }}
      className="my-slide-component"
    >
      <img
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
          borderRadius: '20px',
        }}
        draggable={false}
        src={cover}
        alt="img"
      />
    </div>
  );
});
