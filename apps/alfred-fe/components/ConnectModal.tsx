import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import { useWallet } from '@alfred/wallets';
import Option from './Option';

interface Props {
  isOpen: boolean;
  closeModal(): void;
}

export default function SelectWalletModal({ isOpen, closeModal }: Props) {
  const { connectors } = useWallet();
  return (
    <Dialog open={isOpen} onClose={closeModal} maxWidth="xs">
      <DialogTitle>
        <Stack direction="column" spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle1">Connect Wallet</Typography>

            <Box
              sx={{
                cursor: 'pointer',
                p: 0.5,
                border: '1px solid rgb(56 56 56)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 1,
                ':hover': {
                  backgroundColor: 'rgb(27 27 27)',
                },
              }}
              onClick={closeModal}
            >
              <CloseIcon sx={{ height: 22, width: 22 }} />
            </Box>
          </Stack>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Get started with your Ethereum wallet to sign messages and send transactions
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack direction="column" sx={{ py: 3 }} spacing={2}>
          {connectors
            .filter((conn) => conn.getName() !== 'WalletConnectV2')
            ?.map((connection) => {
              return (
                <Option key={connection?.getName()} connection={connection} close={closeModal} />
              );
            })}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
