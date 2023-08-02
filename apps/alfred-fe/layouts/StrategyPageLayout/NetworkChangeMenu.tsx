import { useGetChainId } from '@alfred/alfred-common';
import {
  ARBITRUM_CHAIN_IDS,
  ETHREUM_CHAIN_IDs,
  POLYGON_CHAIN_IDs,
  useWallet,
} from '@alfred/wallets';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MenuPopover } from '@sdf/base';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { GnosisSafe } from '@web3-react/gnosis-safe';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2';
import { useCallback, useState } from 'react';

export default function NetworkChangeMenu({ isMobile = false }) {
  const activeChainId = useGetChainId();
  const { connector } = useWallet();

  const MENU_OPTIONS = () => [
    {
      label: 'Polygon',
      icon: 'MATIC.svg',
      chainId: POLYGON_CHAIN_IDs[0],
    },
    {
      label: 'Ethereum',
      icon: 'ETH.svg',
      chainId: ETHREUM_CHAIN_IDs[0],
    },
    {
      label: 'Arbitrum',
      icon: 'ETH.svg',
      chainId: ARBITRUM_CHAIN_IDS[0],
    },
  ];

  const [open, setOpen] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = (): void => {
    setOpen(null);
  };

  const switchChain = useCallback(
    async (desiredChainId: number) => {
      if (connector) {
        if (desiredChainId === -1 || connector instanceof GnosisSafe) {
          await connector.activate();
        } else if (
          connector instanceof WalletConnectV2 ||
          connector instanceof WalletConnect ||
          connector instanceof Network ||
          connector instanceof MetaMask ||
          connector instanceof CoinbaseWallet
        ) {
          await connector.activate(desiredChainId);
        } else {
          await connector.activate();
        }
      }
    },
    [connector]
  );

  function handleSwitchChain(chainId) {
    if (!chainId || chainId === activeChainId) {
      handleClose();
      return;
    }

    switchChain(chainId);
    handleClose();
  }

  const selectedChain = MENU_OPTIONS().filter((option) => option.chainId === activeChainId)[0];

  return (
    <>
      {isMobile ? (
        <Box
          onClick={handleOpen}
          sx={{
            backgroundColor: 'transparent',
            p: 1,
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: 2,
          }}
        >
          <Avatar
            src={`/assets/crypto-logo/${selectedChain.icon}`}
            style={{ height: 14, width: 14 }}
          />
        </Box>
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
            <Avatar
              src={`/assets/crypto-logo/${selectedChain.icon}`}
              style={{ height: 26, width: 26 }}
            />
            <Typography variant="body2" sx={{ color: '#fff' }}>
              {selectedChain.label}
            </Typography>
          </Stack>
        </Button>
      )}

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
          {MENU_OPTIONS().map((option) => (
            <MenuItem
              disabled={option.chainId === ARBITRUM_CHAIN_IDS[0]}
              key={option.label}
              onClick={() => handleSwitchChain(option.chainId)}
            >
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar
                  src={`/assets/crypto-logo/${option.icon}`}
                  style={{ height: 26, width: 26 }}
                />
                <Typography variant="body2" sx={{ color: '#fff' }}>
                  {option.label}
                </Typography>
              </Stack>
            </MenuItem>
          ))}
        </Stack>
      </MenuPopover>
    </>
  );
}
