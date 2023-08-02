import AddLinkIcon from '@mui/icons-material/AddLink';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import Box from '@mui/material/Box';
import Icon from '@mui/material/Icon';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import useTheme from '@mui/system/useTheme';
import { Stack } from '@mui/material';
import dynamic from 'next/dynamic';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useWallet } from '@alfred/wallets';

const SwapDialog = dynamic(() => import('@alfred/alfred-common').then((mod) => mod.SwapDialog), {
  ssr: false,
});

const navigationConfig = (account: string) => [
  {
    text: 'My Analytics',
    icon: DonutSmallOutlinedIcon,
    mode: `?mode=analytics&account=${account}`,
    link: `/copy-trading/dashboard?mode=analytics&account=${account}`,
  },
  {
    text: 'Leaderboard',
    icon: SignalCellularAltIcon,
    mode: 'leaderboard',
    link: '/copy-trading',
  },
  {
    text: 'Copied Traders',
    icon: AddLinkIcon,
    mode: `?mode=trades&account=${account}`,
    link: `/copy-trading/dashboard?mode=trades&account=${account}`,
  },
  {
    text: 'Trades History',
    icon: SwapHorizIcon,
    mode: `?mode=history&account=${account}`,
    link: `/copy-trading/dashboard?mode=history&account=${account}`,
  },
];

const CopyTradeDashboardNavigations = () => {
  const [swap, setSwap] = useState<boolean>(false);
  // const theme = useTheme();
  const { account } = useWallet();
  const { push, query } = useRouter();
  let userAddress = query?.account as string;
  if (userAddress === undefined) userAddress = account;
  const currMode = query?.mode;
  function handleSwap() {
    setSwap(!swap);
    // setOnSwap(!onSwap);
  }

  function handleChange(mode: string) {
    push(mode);
  }
  // const data = {
  //   username: '',
  //   logo: {
  //     image_200_x_200: '',
  //   },
  // };
  return (
    <Stack direction="column">
      <SwapDialog isOpen={swap} handleClose={handleSwap} />
      <List
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          {navigationConfig(userAddress).map(({ text, icon, mode, link }) => (
            <ListItemButton
              key={text}
              onClick={() => {
                if (mode === 'leaderboard') {
                  push(link);
                } else {
                  handleChange(mode);
                }
              }}
              LinkComponent={NextLink}
              sx={{
                py: 2,
                borderRadius: 2,
              }}
            >
              <ListItemIcon>
                <Icon component={icon} />
              </ListItemIcon>
              <ListItemText
                sx={{
                  textDecoration: mode?.split('=')[1] == currMode ? 'underline' : 'none',
                  textUnderlineOffset: 10,
                  textDecorationColor: '#3574F3',
                }}
              >
                {text}
              </ListItemText>
            </ListItemButton>
          ))}
        </Box>
      </List>
    </Stack>
  );
};

export default CopyTradeDashboardNavigations;
