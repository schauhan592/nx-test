import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { CSSObject, Theme, styled } from '@mui/material/styles';
import { Iconify } from '@sdf/base';
import Image from 'next/image';
import * as React from 'react';
import CopyTradingHeader from '../layouts/CopyTradingLayout/CopyTradingHeader';
import { NewLogo } from '../public/assets';
import { useWallet } from '@alfred/wallets';
import { useRouter } from 'next/router';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 240;

interface SideDrawerProps {
  children: React.ReactNode;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'visible',
  overflowY: 'visible',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'visible',
  overflowY: 'visible',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

function getItems(account: string) {
  return [
    {
      label: 'Dashboard',
      icon: 'humbleicons:dashboard',
      link: account ? `/copy-trading/dashboard?mode=analytics&account=${account}` : '/copy-trading',
    },
    {
      label: 'Copied Traders',
      icon: 'uil:link-add',
      link: account ? `/copy-trading/dashboard?mode=trades&account=${account}` : '/copy-trading',
    },
    {
      label: 'My Positions',
      icon: 'fluent:arrow-growth-24-filled',
      link: account ? `/copy-trading/dashboard?mode=trades&account=${account}` : '/copy-trading',
    },
    {
      label: 'Trades',
      icon: 'icon-park-outline:ranking',
      link: account ? `/copy-trading/dashboard?mode=history&account=${account}` : '/copy-trading',
    },
  ];
}

// const otherItems = [
//   {
//     label: 'LP Section',
//     icon: 'uil:usd-circle',
//     link: '/',
//   },
// ];

export default function SideDrawer({ children }: SideDrawerProps) {
  const [open, setOpen] = React.useState(true);
  const { account } = useWallet();
  const { push, query } = useRouter();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <CopyTradingHeader />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {open && (
            <React.Fragment>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                spacing={2}
                pl={2}
              >
                <Image src={NewLogo} height={24} width={24} alt="alfred-logo" />
                <Typography variant="h5" fontWeight="normal">
                  alfred
                </Typography>
              </Stack>
              <IconButton
                size="small"
                sx={{
                  position: 'absolute',
                  border: '1px solid grey',
                  backgroundColor: 'background.paper',
                  right: '-20px',
                  '&:hover': {
                    backgroundColor: 'background.paper',
                  },
                }}
              >
                <ChevronLeftIcon onClick={handleDrawerClose} />
              </IconButton>
            </React.Fragment>
          )}

          {!open && (
            <React.Fragment>
              <IconButton>
                <Image src={NewLogo} height={24} width={24} alt="alfred-logo" />
              </IconButton>
              <IconButton
                onClick={handleDrawerOpen}
                size="small"
                sx={{
                  position: 'absolute',
                  border: '1px solid grey',
                  backgroundColor: 'background.paper',
                  right: '-20px',
                  '&:hover': {
                    backgroundColor: 'background.paper',
                  },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </React.Fragment>
          )}
        </DrawerHeader>
        <Divider sx={{ mt: -0.1 }} />
        <List>
          {getItems(account).map(({ label, icon, link }) => (
            <ListItem
              key={label}
              disablePadding
              sx={{ display: 'block' }}
              onClick={() => push(link)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  borderRight:
                    String(query?.mode) === link.split('=')[1]?.split('&')[0]
                      ? '4px solid blue'
                      : '',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Iconify icon={icon} height={24} width={24} />
                </ListItemIcon>
                <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider />
        <List>
          {otherItems.map(({ label, icon, link }) => (
            <ListItem
              key={label}
              disablePadding
              sx={{ display: 'block' }}
              onClick={() => push(link)}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Iconify icon={icon} height={24} width={24} />
                </ListItemIcon>
                <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, pt: 10, position: 'relative' }}>
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  );
}
