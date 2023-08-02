import React, { ReactNode } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { HEADER } from '../../config';
import { styled, useTheme } from '@mui/material/styles';
import StrategyHeader from './StrategyHeader';
import { HeaderBreadcrumbs, TLink } from '@sdf/base';

type Props = {
  children: ReactNode;
  breadCrumbLinks?: TLink[];
  heading?: string;
  subHeading?: string;
};

const MainStyle = styled('main')(({ theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  background: theme?.palette?.background?.default,
  [theme?.breakpoints.up('lg')]: {
    // paddingLeft: 16,
    // paddingRight: 16,
    // paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    // width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme?.transitions.create('margin-left', {
      duration: theme?.transitions.duration.shorter,
    }),
  },
}));

export default function StrategyPageLayout({
  children,
  heading,
  breadCrumbLinks,
  subHeading,
}: Props) {
  const theme = useTheme();

  return (
    <Stack sx={{ minHeight: 1, background: theme?.palette?.background?.default }}>
      <StrategyHeader />
      <MainStyle>
        <Container maxWidth="xl">
          {breadCrumbLinks?.length > 0 && <HeaderBreadcrumbs links={breadCrumbLinks} heading="" />}
          {heading && <Typography variant="h2">{heading}</Typography>}
          {subHeading && (
            <Typography variant="body1" sx={{ color: 'text.secondary', minWidth: 200 }}>
              {subHeading}
            </Typography>
          )}
          {children}
        </Container>
      </MainStyle>
      <Box sx={{ flexGrow: 1 }} />
    </Stack>
  );
}
