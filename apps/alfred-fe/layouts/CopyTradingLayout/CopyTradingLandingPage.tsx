import { TLink } from '@sdf/base';
import React, { ReactNode } from 'react';
import CopyTradingLandingPageHeader from './CopyTradingLandingPageHeader';
import { Box } from '@mui/material';
import { Container } from '@mui/system';

type Props = {
  children: ReactNode;
  breadCrumbLinks?: TLink[];
  heading?: string;
  subHeading?: string;
};

export default function CopyTradingLandingPageLayout({ children }: Props) {
  return (
    <Box sx={{ position: 'relative', height: '100vh', width: '100%' }}>
      <CopyTradingLandingPageHeader />
      <Box component="main" sx={{ flexGrow: 1, pt: 10, position: 'relative', width: '100%' }}>
        <Container
          disableGutters
          sx={{ padding: 0, '!important': { padding: '0px' } }}
          maxWidth="xl"
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
}
