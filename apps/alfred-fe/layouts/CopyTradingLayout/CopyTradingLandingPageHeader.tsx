import { useWallet } from '@alfred/wallets';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { MenuPopover, useOffSetTop } from '@sdf/base';
import dynamic from 'next/dynamic';
import { HEADER } from '../../config';
import Link from 'next/link';
import { Link as MUILink, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { Logo } from '../../public/assets';
import Divider from '@mui/material/Divider';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

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

export default function CopyTradingLandingPageHeader() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const { handleOpenConnectModal, account } = useWallet();

  const theme = useTheme();
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));

  const [openMenu, setOpenMenu] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(event.currentTarget);
  };

  const handleClose = (): void => {
    setOpenMenu(null);
  };

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
          justifyContent: 'center',
          height: '100%',
          width: '100%',
          px: 3,
        }}
      >
        <Box></Box>

        <Stack
          direction="row"
          spacing={3}
          alignItems="center"
          sx={{
            justifyContent: { xs: 'space-between' },
            width: { xs: '100%', lg: '90%', xl: '85%' },
            minWidth: '375px',
            padding: { xs: '0px', sm: '20px' },
          }}
        >
          <Stack
            sx={{
              width: { xs: '100%', md: '45%' },
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start' },
              justifyContent: 'space-between',
            }}
          >
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '200px',
              }}
            >
              <Link href="/">
                <Stack
                  sx={{
                    width: '110px',
                    cursor: 'pointer',
                  }}
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                  pl={2}
                >
                  <Image src={Logo} height={20} width={20} alt="alfred-logo" />
                  <Typography variant="h5" fontWeight="bold">
                    alfred
                  </Typography>
                </Stack>
              </Link>

              <Divider
                orientation="vertical"
                color="#2D2D3D"
                sx={{ m: '0 35px', height: '40px', width: '.2px', opacity: '.5' }}
              />
            </Stack>
            {isLg && (
              <Stack
                gap={2}
                sx={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  width: '100%',
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  fontWeight: 'bold',
                  fontSize: '15px',
                  mt: { xs: 2, md: 0 },
                }}
              >
                <Link href="/copy-trading/leaderboard">CopyTrading</Link>

                <MUILink
                  href={'https://deqode.gitbook.io/alfred-walk-through'}
                  rel="noopener"
                  target="_blank"
                  underline="none"
                  color="white"
                >
                  Resources
                </MUILink>
                <Link href="/copy-trading/about">About</Link>
              </Stack>
            )}
          </Stack>
          {isLg ? (
            <Stack direction="row" spacing={2} alignItems="center">
              {account ? (
                <AccountPopover />
              ) : (
                <Button
                  sx={{
                    // borderRadius: '20px',
                    color: 'text.primary',
                    borderWidth: '2px',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    width: '150px',
                  }}
                  size="medium"
                  variant="outlined"
                  onClick={handleOpenConnectModal}
                >
                  Connect Wallet
                </Button>
              )}
            </Stack>
          ) : (
            <>
              <Button
                onClick={handleOpen}
                sx={{
                  backgroundColor: 'transparent',
                  p: 1,
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: 2,
                }}
              >
                <Stack direction="row" alignItems="center" color="text.primary">
                  <MenuIcon />
                </Stack>
              </Button>

              <MenuPopover
                open={Boolean(openMenu)}
                anchorEl={openMenu}
                onClose={handleClose}
                sx={{
                  width: '180px',
                  p: 1,
                  mt: 1.5,
                  ml: 0.75,
                  '& .MuiMenuItem-root': {
                    typography: 'body2',
                    borderRadius: 0.75,
                  },
                }}
              >
                <Stack py={1} gap={1} sx={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    {account ? (
                      <AccountPopover />
                    ) : (
                      <Button
                        sx={{
                          // borderRadius: '20px',
                          color: 'text.primary',
                          borderWidth: '2px',
                          fontWeight: 'bold',
                          fontSize: '13px',
                        }}
                        size="medium"
                        variant="outlined"
                        onClick={handleOpenConnectModal}
                      >
                        Connect Wallet
                      </Button>
                    )}
                  </Stack>
                  <Link href="/copy-trading/leaderboard" passHref>
                    <MenuItem onClick={handleClose}>CopyTrading</MenuItem>
                  </Link>
                  <MUILink
                    href={'https://deqode.gitbook.io/alfred-walk-through'}
                    rel="noopener"
                    target="_blank"
                    underline="none"
                    color="white"
                  >
                    <MenuItem onClick={handleClose}>Resources</MenuItem>
                  </MUILink>
                  <Link href="/copy-trading/about" passHref>
                    <MenuItem onClick={handleClose}>About</MenuItem>
                  </Link>
                </Stack>
              </MenuPopover>
            </>
          )}
        </Stack>
      </Box>
    </ToolbarStyle>
  );
}
