import DoneIcon from '@mui/icons-material/Done';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import { StepIconProps } from '@mui/material/StepIcon';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import styled from '@mui/system/styled';
// import { useSnackbar } from 'notistack';
import { useSignTransaction } from '@alfred/wallets';
import { SelectChangeEvent } from '@mui/material/Select';
import { ethers } from 'ethers';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TXN_TYPE, TxMode, VaultRedeemSharesType } from '../@types';
import { useTransactionMonitor } from '../contexts';
import { useVaultRedeemSharesType } from '../hooks';
import { useGetChainId } from '../hooks/index';
import { maxPriorityFee } from '../services';
import TransactionSimulation from './TransactionSimulation';
import { ProgressStatus } from './TxnBuilderDialog';

interface Props {
  payload: VaultRedeemSharesType | undefined;
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
    description: `Creating Transaction for redeeming funds.`,
  },
  {
    label: 'Sign Transaction',
    description: 'Open your wallet and sign Transaction for redeeming funds.',
  },
  {
    label: 'Funds Redeemed',
    description: `You have redeemed your funds successfully.`,
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

export default function RedeemShare(props: Props) {
  const { payload, setStatus, status, walletAddress, handleTxSpeed, transactionSpeed } = props;
  const [activeStep, setActiveStep] = useState<number>(0);
  // const { enqueueSnackbar } = useSnackbar();
  const [initiated, setInitiated] = useState<boolean>(false);

  const { mutate, data, error } = useVaultRedeemSharesType();
  const { watchTransaction, isTxnInitiated, txnStatus, resetMonitor } = useTransactionMonitor();
  const chainId = useGetChainId();

  const { signTxn } = useSignTransaction({ watchTransaction });

  useEffect(() => {
    if (!data && payload) mutate(payload);
  }, [payload]);

  useEffect(() => {
    if (!isTxnInitiated && txnStatus && txnStatus?.status === 'txConfirmed') {
      setStatus({
        ...status,
        success: {
          isSuccess: true,
          message: 'Your funds from the Investment pool has been redeemed successfully.',
        },
        isLoading: false,
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

  function handleApprovalClickRequest() {
    if (data) {
      setStatus({
        success: { isSuccess: false },
        error: { isError: false },
        isLoading: true,
      });
      resetMonitor();
      setInitiated(true);
      setActiveStep(1);
      signRawTxn(data);
    }
  }

  async function signRawTxn(txn: TXN_TYPE) {
    const priorityFee = await maxPriorityFee(chainId);
    let estimatedPriorityFee;
    if (priorityFee.estimate) {
      if (transactionSpeed === 'slow') {
        estimatedPriorityFee = priorityFee.estimate.slowEstimate;
      } else if (transactionSpeed === 'medium') {
        estimatedPriorityFee = priorityFee.estimate.averageEstimate;
      } else {
        estimatedPriorityFee = priorityFee.estimate.fastEstimate;
      }
    }

    const rawTx = {
      ...txn,
      gasLimit: ethers?.BigNumber?.from(data?.gasLimit),
      maxPriorityFeePerGas: estimatedPriorityFee
        ? estimatedPriorityFee
        : ethers?.BigNumber?.from(data?.maxPriorityFeePerGas),
    };

    const res = await signTxn(rawTx);
    if (!res?.success) {
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
          <TransactionSimulation
            transactionSpeed={transactionSpeed}
            handleTxSpeed={handleTxSpeed}
            rawTx={data}
            owner={walletAddress as string}
          />
          <Button
            fullWidth
            sx={{ margin: '5px 0' }}
            size="small"
            variant="contained"
            onClick={handleApprovalClickRequest}
            endIcon={<RocketLaunchIcon />}
            disabled={!data}
          >
            Redeem Share
          </Button>
        </Stack>
      ) : (
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={ColorlibStepIcon}
                optional={index === 2 ? <Typography variant="caption">Last step</Typography> : null}
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
