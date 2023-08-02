import { Connection, ConnectionConfig, useWallet } from '@alfred/wallets';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Connector } from '@web3-react/types';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { SetStateAction, useState } from 'react';

const MenuPopover = dynamic(() => import('@sdf/base').then((mod) => mod.MenuPopover));

interface OptionProps {
  connection: Connection;
  close(): void;
}

interface DropdownMenuProps {
  isActive: boolean;
  setConnectingState: (
    value: SetStateAction<{
      isConnecting: boolean;
      provider: string;
    }>
  ) => void;
  connection: Connection;
  connector: Connector;
}

function DropdownMenu({ isActive, connection, setConnectingState, connector }: DropdownMenuProps) {
  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setOpen(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation();
    setOpen(null);
  };

  function handleConnect() {
    if (!isActive) {
      discardConnection();
      if (!connection?.overrideActivate()) {
        setConnectingState({ isConnecting: true, provider: connection?.getName() });
        connection?.connector.activate();
      }
    }
  }

  function discardConnection() {
    connector && connector?.resetState && connector?.resetState();
    localStorage.removeItem(ConnectionConfig.DEFAULT_PROVIDER);
    localStorage.removeItem(ConnectionConfig.CONNECTION_STATE);
  }

  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        aria-label="Open to show more"
        title="Open to show more"
      >
        <MoreHorizIcon />
      </IconButton>
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Stack sx={{ p: 1 }}>
          <MenuItem onClick={handleConnect}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar src={`/assets/images/walletConnect.png`} style={{ height: 26, width: 26 }} />
              <Typography variant="body2" sx={{ color: '#fff' }}>
                Connect V2
              </Typography>
            </Stack>
          </MenuItem>
        </Stack>
      </MenuPopover>
    </>
  );
}

export default function Option({ connection }: OptionProps) {
  const { isActive, connector, setConnectingState, connectors } = useWallet();

  const v2Instance = connectors?.filter((instance) => instance.getName() === 'WalletConnectV2')[0];

  function handleConnect() {
    if (!isActive) {
      discardConnection();
      if (!connection?.overrideActivate()) {
        setConnectingState({ isConnecting: true, provider: connection?.getName() });
        connection?.connector.activate();
      }
    }
  }

  function discardConnection() {
    connector && connector?.resetState && connector?.resetState();
    localStorage.removeItem(ConnectionConfig.DEFAULT_PROVIDER);
    localStorage.removeItem(ConnectionConfig.CONNECTION_STATE);
  }

  return (
    <Box
      onClick={() => handleConnect()}
      sx={{
        p: 1,
        cursor: 'pointer',
        border: '1px solid rgb(56 56 56)',
        borderRadius: 1,
        ':hover': {
          backgroundColor: 'rgb(27 27 27)',
        },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          {connection?.getIcon() && (
            <Image alt="" src={connection?.getIcon()} height={34} width={34} />
          )}
          <Typography variant="body1">{connection?.getName()}</Typography>
        </Stack>

        {connection?.getName() === 'WalletConnect' && (
          <DropdownMenu
            isActive={isActive}
            setConnectingState={setConnectingState}
            connection={v2Instance}
            connector={v2Instance.connector}
          />
        )}
      </Stack>
    </Box>
  );
}
