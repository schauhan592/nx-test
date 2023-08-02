// @mui
import { Button, CircularProgress, Dialog, DialogContent, Stack, Typography } from '@mui/material';
// next
import { useRouter } from 'next/router';
// react
import { useCallback, useEffect, useState } from 'react';

import { GnosisSafe } from '@web3-react/gnosis-safe';
import { MetaMask } from '@web3-react/metamask';
import { Network } from '@web3-react/network';
import { WalletConnect } from '@web3-react/walletconnect';
import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2';

// types
// utils
import {
  useWallet,
  getNetworkName,
  ARBITRUM_CHAIN_IDS,
  ETHREUM_CHAIN_IDs,
  POLYGON_CHAIN_IDs,
} from '@alfred/wallets';

// -----------------------------------------------------------------------------

const WrongNetwork = () => {
  const { pathname } = useRouter();
  const isArbitrumOnly = pathname?.split('/')[1] === 'copy-trading';

  const [openDialog, setOpenDialog] = useState(false);

  const { isActive, chainId: activeChainId, connector } = useWallet();

  const SUPPORTED_NETWORK = isArbitrumOnly ? ARBITRUM_CHAIN_IDS[0] : POLYGON_CHAIN_IDs[0];

  const switchChain = useCallback(
    async (desiredChainId: number) => {
      if (connector) {
        try {
          if (
            // If we're already connected to the desired chain, return
            desiredChainId === activeChainId ||
            // If they want to connect to the default chain and we're already connected, return
            (desiredChainId === -1 && activeChainId !== undefined)
          ) {
            return;
          }

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
        } catch (error) {
          console.error(error);
        }
      }
    },
    [connector, activeChainId]
  );

  useEffect(() => {
    const checkNetwork = (): boolean => {
      if (isActive) {
        if (
          (isArbitrumOnly && activeChainId === ARBITRUM_CHAIN_IDS[0]) ||
          (!isArbitrumOnly &&
            (activeChainId === POLYGON_CHAIN_IDs[0] || activeChainId === ETHREUM_CHAIN_IDs[0]))
        ) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    };

    const result = checkNetwork();

    setOpenDialog(result);

    if (result === true) {
      switchChain(SUPPORTED_NETWORK);
    }
  }, [isActive, activeChainId, SUPPORTED_NETWORK, isArbitrumOnly, switchChain]);

  // TODO: Take pathname from props for validation
  return (
    <Dialog open={openDialog} aria-describedby="alert-dialog-slide-description" fullWidth>
      <DialogContent>
        <Stack direction="row" justifyContent="center" alignItems="center" spacing={2}>
          <CircularProgress />
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ mt: 3 }}
        >
          <Typography variant="h3" gutterBottom component="div">
            Wrong network
          </Typography>
        </Stack>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ textAlign: 'center' }}
        >
          <Typography variant="body1" component="div" sx={{ color: 'text.secondary' }}>
            Looks like you are connected to an unsupported network. Change your wallet network to{' '}
            <Typography component="span" variant="button" sx={{ color: 'primary.main' }}>
              {getNetworkName(SUPPORTED_NETWORK || 137)} Network
            </Typography>
          </Typography>
          <Button variant="outlined" onClick={() => switchChain(SUPPORTED_NETWORK)}>
            Switch Network
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default WrongNetwork;
