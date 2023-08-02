import { useWalletAddress } from '@alfred/wallets';
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/system/Stack';
import { ethers } from 'ethers';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import Web3Modal from 'web3modal';
import { DEFAULT_SOURCE_NETWORK, DEFAULT_SOURCE_TOKEN } from '../utils';

type SwapDialogProps = {
  isOpen: boolean;
  handleClose: () => void;
};

const Bridge = dynamic(() => import('@socket.tech/plugin').then((mod) => mod.Bridge), {
  ssr: false,
});

export default function SwapDialog({ isOpen, handleClose }: SwapDialogProps) {
  const [provider, setProvider] = useState<any>(null);

  const account = useWalletAddress();

  const pluginStyles = {
    secondary: 'rgb(55,55,55)',
    primary: 'rgb(55,55,55)',
    accent: 'rgb(53,116,243)',
    onAccent: 'rgb(255,255,255)',
    interactive: 'rgb(0,0,0)',
    onInteractive: 'rgb(240,240,240)',
    text: 'rgb(255,255,255)',
    secondaryText: 'rgb(200,200,200)',
    fontFamily: 'Sora sans-serif',
  };

  useEffect(() => {
    if (account) {
      getProvider().then((res) => setProvider(res));
    }
  }, [account]);

  async function getProvider() {
    const web3Modal = new Web3Modal();
    const web3ModalProvider = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(web3ModalProvider);
    return provider;
  }

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2}>
          {isOpen ? (
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </Stack>
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 2 }}>
        <Grid container>
          <Bridge
            provider={provider}
            API_KEY={process.env.NEXT_PUBLIC_SOCKET_API_KEY as string}
            enableSameChainSwaps={true}
            customize={pluginStyles}
            defaultSourceNetwork={DEFAULT_SOURCE_NETWORK}
            defaultSourceToken={DEFAULT_SOURCE_TOKEN}
          />
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
