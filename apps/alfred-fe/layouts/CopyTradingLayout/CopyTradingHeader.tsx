import { useWallet } from '@alfred/wallets';
import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Iconify, useOffSetTop } from '@sdf/base';
import dynamic from 'next/dynamic';
import { HEADER } from '../../config';
import Link from 'next/link';

const AccountPopover = dynamic(() => import('../StrategyPageLayout/AccountPopover'), {
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

export default function CopyTradingHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const { handleOpenConnectModal, account } = useWallet();

  return (
    <ToolbarStyle
      sx={{
        ...(isOffset &&
          {
            // ...cssStyles(theme).bgBlur(),
            // height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
          }),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          width: '100%',
          px: 3,
        }}
      >
        <Box></Box>
        <Stack direction="row" spacing={3} alignItems="center">
          <Link href="/copy-trading/leaderboard">
            <Button
              variant="outlined"
              startIcon={<Iconify icon="ph:crown" height={24} width={24} />}
            >
              Leaderboard
            </Button>
          </Link>

          {account ? (
            <Stack direction="row" spacing={2} alignItems="center">
              <AccountPopover />
            </Stack>
          ) : (
            <Button size="medium" variant="contained" onClick={handleOpenConnectModal}>
              Connect Wallet
            </Button>
          )}
        </Stack>
      </Box>
    </ToolbarStyle>
  );
}
