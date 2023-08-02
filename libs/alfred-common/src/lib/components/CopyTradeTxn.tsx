import { useSignTransaction } from '@alfred/wallets';
import DoneIcon from '@mui/icons-material/Done';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import StepContent from '@mui/material/StepContent';
import { StepIconProps } from '@mui/material/StepIcon';
import { styled } from '@mui/material/styles';
import { BigNumber } from 'ethers';
import { useSnackbar } from 'notistack';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TXN_TYPE, TxMode } from '../@types';
import { CopyTradeCreateVaultPayload } from '../@types/copy-trade';
import { useTransactionMonitor } from '../contexts';
import useCopyTradeCreateVault from '../hooks/useCopyTradeCreateVault';
import { ProgressStatus } from './TxnBuilderDialog';

interface Props {
  payload: CopyTradeCreateVaultPayload | undefined;
  setActiveStep: Dispatch<SetStateAction<number>>;
  walletAddress: string;
  status: ProgressStatus;
  setStatus: Dispatch<SetStateAction<ProgressStatus>>;
  transactionSpeed: TxMode;
  handleTxSpeed: (e: SelectChangeEvent) => void;
}

const steps = [
  {
    label: 'Creating Transaction',
    description: `Creating Transaction for copy the trade.`,
  },
  {
    label: 'Sign Transaction',
    description: 'Open your wallet and sign transaction to copy trades',
  },
  {
    label: 'Copied Successfully',
    description: `The trade has been copied successfully. `,
  },
];

const ColorlibStepIconRoot = styled('div')<{
  ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.divider,
  zIndex: 1,
  color: '#fff',
  width: 30,
  height: 30,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage: `linear-gradient( 136deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.primary.main} 100%)`,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage: `linear-gradient( 136deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.light} 50%, ${theme.palette.primary.main} 100%)`,
  }),
}));

function ColorlibStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {active && <CircularProgress size={18} sx={{ color: 'white' }} />}
      {completed && <DoneIcon sx={{ color: 'white', height: 18, width: 18 }} />}
      {!active && !completed && <MoreHorizIcon sx={{ color: 'white', height: 18, width: 18 }} />}
    </ColorlibStepIconRoot>
  );
}

export default function CopyTradeTxn(props: Props) {
  const { payload, setStatus, status } = props;
  const [activeStep, setActiveStep] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();
  const [initiated, setInitiated] = useState<boolean>(false);

  const { mutate, data, error } = useCopyTradeCreateVault();
  const { watchTransaction, isTxnInitiated, txnStatus, resetMonitor } = useTransactionMonitor();

  const { signTxn } = useSignTransaction({ watchTransaction });

  useEffect(() => {
    if (!isTxnInitiated && txnStatus && txnStatus?.status === 'txConfirmed') {
      setStatus({
        ...status,
        isLoading: false,
        success: { isSuccess: true, message: 'You have successfully copied the trader' },
      });
      setActiveStep(3);
    } else if (txnStatus && txnStatus?.status === 'txFailed') {
      setStatus({
        ...status,
        success: {
          isSuccess: false,
          message: 'Something went wrong, your transaction has failed',
        },
        isLoading: false,
      });
      setActiveStep(0);
    } else if (txnStatus && txnStatus?.status === 'txRequest') {
      setStatus({
        ...status,
        success: {
          isSuccess: false,
          message: 'Transaction was not mined under 50 blocks.',
        },
        isLoading: false,
      });
      setActiveStep(0);
    }
  }, [isTxnInitiated, txnStatus]);

  useEffect(() => {
    if (data) {
      resetMonitor();
      setActiveStep(1);
      signRawTxn(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      setInitiated(false);
      setActiveStep(0);
      setStatus({
        ...status,
        isLoading: false,
        error: { isError: true, message: `Something went wrong: ${JSON?.stringify(error)}` },
      });
    }
  }, [error]);

  function handlCopyTrade() {
    if (payload) {
      setInitiated(true);
      mutate(payload);
      setStatus({
        success: { isSuccess: false },
        error: { isError: false },
        isLoading: true,
      });
    }
  }

  async function signRawTxn(txn: TXN_TYPE) {
    const rawTx = {
      ...txn,
      gasLimit: BigNumber.from(data?.gasLimit),
      maxPriorityFeePerGas: BigNumber.from(data?.maxPriorityFeePerGas),
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const res = await signTxn(rawTx);
    if (!res?.success) {
      enqueueSnackbar(res?.message, { variant: 'error' });
      setInitiated(false);
      setActiveStep(0);
      setStatus({
        ...status,
        isLoading: false,
        error: { isError: true, message: res?.message },
      });
    }
  }

  return (
    <Box>
      {!initiated ? (
        <Stack direction="column" alignItems="center" justifyContent="center" gap={2}>
          <Button
            fullWidth
            sx={{ margin: '5px 0' }}
            size="small"
            variant="contained"
            onClick={handlCopyTrade}
            endIcon={<RocketLaunchIcon />}
            disabled={!payload}
          >
            Copy Trader
          </Button>
        </Stack>
      ) : (
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={ColorlibStepIcon}
                // optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {step.description}
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      )}
    </Box>
  );
}
