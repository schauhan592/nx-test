import { forwardRef } from 'react';
// import Image from 'next/image';
import NextLink from 'next/link';
import { Box, BoxProps, Typography } from '@mui/material';

interface Props extends BoxProps {
  link?: string;
  disabledLink?: boolean;
  redirectUrl?: string;
}

// eslint-disable-next-line react/display-name
const Logo = forwardRef<any, Props>(({ link, disabledLink = false, sx }, ref) => {
  const logo = (
    <Box ref={ref} sx={{ width: 138, height: 48, cursor: 'pointer', ...sx }}>
      {/* <Image
        height={48}
        width={138}
        src="/assets/main_logo.svg"
        objectFit="contain"
        layout="fixed"
        alt="logo"
      /> */}
      <Typography variant="body1" fontSize={30}>
        alfred
      </Typography>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <NextLink href={link}>{logo}</NextLink>;
});

export default Logo;
