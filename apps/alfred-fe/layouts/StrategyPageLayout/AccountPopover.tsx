import { AddressAvatar, useGetChainId } from '@alfred/alfred-common';
import { ARBITRUM_CHAIN_IDS, ConnectionConfig, useWallet } from '@alfred/wallets';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Iconify, MenuPopover, truncateAddress, useIsMountedRef } from '@sdf/base';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function AccountPopover({ isMobile = false }) {
  const { push } = useRouter();
  const connectedChainId = useGetChainId();
  const { connector, account } = useWallet();

  const MENU_OPTIONS = (address: string) => [
    {
      label: 'Dashboard',
      linkTo: window?.location?.pathname.startsWith('/copy-trading')
        ? `/copy-trading/dashboard?mode=analytics&account=${account}`
        : `/user/${address}?tab=balance`,
    },
  ];

  const isMountedRef = useIsMountedRef();

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (): void => {
    setOpen(null);
  };

  const disconnect = async () => {
    if (connector?.deactivate) {
      connector?.deactivate();
      localStorage.removeItem(ConnectionConfig.DEFAULT_PROVIDER);
      localStorage.setItem(ConnectionConfig.CONNECTION_STATE, ConnectionConfig.DISCONNECTED);
    } else {
      connector?.resetState();
      localStorage.removeItem(ConnectionConfig.DEFAULT_PROVIDER);
      localStorage.setItem(ConnectionConfig.CONNECTION_STATE, ConnectionConfig.DISCONNECTED);
    }
  };

  const handleLogout = async () => {
    try {
      if (isMountedRef.current) {
        handleClose();
        disconnect();
        push(connectedChainId === ARBITRUM_CHAIN_IDS[0] ? '/copy-trading' : '/');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {isMobile ? (
        <Button
          onClick={handleOpen}
          sx={{
            backgroundColor: 'transparent',
            p: 1,
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <AddressAvatar address={account} size="sm" />
          </Stack>
        </Button>
      ) : (
        <Button
          onClick={handleOpen}
          sx={{
            backgroundColor: 'transparent',
            p: 1,
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 2,
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <AddressAvatar address={account} size="sm" />
            <Typography variant="body2" sx={{ color: '#fff' }}>
              {truncateAddress(account)}
            </Typography>
          </Stack>
        </Button>
      )}

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          width: '170px',
          p: 1,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS(account).map((option) => (
            <NextLink key={option.label} href={option.linkTo} passHref>
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            </NextLink>
          ))}
        </Stack>

        <MenuItem onClick={handleLogout} sx={{ margin: '0 8px 8px 8px' }}>
          Disconnect
          <Iconify icon="ant-design:logout-outlined" width={24} />
        </MenuItem>
      </MenuPopover>
    </>
  );
}
