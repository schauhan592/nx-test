import { Box, Skeleton } from '@mui/material';
import React, { useState } from 'react';

type LazyImageProps = {
  image: string;
  alt: string;
  style: Record<any, any>;
  compressor: any;
  compressBy: number;
  showLoader: boolean;
};

const LazyImage: React.FC<LazyImageProps> = ({
  image,
  alt,
  style,
  compressor,
  compressBy,
  showLoader,
}) => {
  const [imageLoadError, setImageLoadError] = useState(false);
  const [imageLoader, setImageLoader] = useState(true);

  function handleError() {
    setImageLoader(true);
    setImageLoadError(true);
  }
  const handleImageLoad = (e: any) => {
    setImageLoader(false);
  };
  return (
    <>
      {imageLoader && showLoader && (
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={'100%'}
          height={'250px'}
          sx={{ borderRadius: '6px' }}
        />
      )}
      <Box
        sx={{
          display: imageLoader ? 'none' : 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          borderRadius: '6px',
          position: 'relative',
          cursor: 'pointer',
        }}
      >
        <img
          src={imageLoadError ? image : compressor(image, compressBy)}
          alt={alt}
          style={style}
          onError={handleError}
          onLoad={handleImageLoad}
        />
      </Box>
    </>
  );
};

export default LazyImage;
