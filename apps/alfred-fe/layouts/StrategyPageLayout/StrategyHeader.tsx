import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { ThemeMode, useOffSetTop, useResponsive } from '@sdf/base';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Logo from '../../components/Logo';
import { HEADER } from '../../config';
const AccountPopover = dynamic(() => import('./AccountPopover'), {
  ssr: false,
});

const NetworkChangeMenu = dynamic(() => import('./NetworkChangeMenu'), {
  ssr: false,
});

import { useWallet } from '@alfred/wallets';
import Link from 'next/link';

const SwapDialog = dynamic(() => import('@alfred/alfred-common').then((mod) => mod.SwapDialog), {
  ssr: false,
});

const ToolbarStyle = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid #3D3D3D',
  height: HEADER.MOBILE_HEIGHT,
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 24,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8,
}));

export default function StrategyHeader() {
  const [swap, setSwap] = useState<boolean>(false);
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const { handleOpenConnectModal, account } = useWallet();

  const isDesktop = useResponsive('up', 'md');

  function handleSwap() {
    setSwap(!swap);
    // setOnSwap(!onSwap);
  }

  return (
    <AppBar>
      <SwapDialog isOpen={swap} handleClose={handleSwap} />
      <ToolbarStyle
        sx={{
          ...(isOffset &&
            {
              // ...cssStyles(theme).bgBlur(),
              // height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
            }),
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
          maxWidth="xl"
        >
          <Stack direction="row" spacing={1} alignItems={'center'}>
            <Logo link={'/'} />
          </Stack>

          <Stack direction="row" spacing={3} alignItems="center">
            <Box>
              <Link href="/copy-trading">
                <Typography sx={{ cursor: 'pointer' }} variant="body2">
                  Copy Trading
                </Typography>
              </Link>
            </Box>

            {account ? (
              <Stack direction="row" spacing={2} alignItems="center">
                {/* <Button size="medium" variant="contained" sx={{ height: 45 }} onClick={handleSwap}>
                  Swap & Bridge
                </Button> */}
                <AccountPopover />
                <NetworkChangeMenu />
              </Stack>
            ) : (
              <Button size="medium" variant="contained" onClick={handleOpenConnectModal}>
                Connect Wallet
              </Button>
            )}
            {isDesktop && false && <ThemeMode />}
          </Stack>
        </Container>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
