import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DoneIcon from '@mui/icons-material/Done';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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
import { useSnackbar } from 'notistack';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useTransactionMonitor } from '../contexts';
import { maxPriorityFee } from '../services';
import web3ApprovalTransaction from '../services/approval';
import { ProgressStatus } from './TxnBuilderDialog';
import TransactionSimulation from './TransactionSimulation';
import { SelectChangeEvent } from '@mui/material/Select';
import { TxMode } from '../@types';
import checkAllowance from '../services/checkAllowance';
import { useGetChainId } from '@alfred/alfred-common';

type Props = {
  value: number;
  owner: string;
  setActiveStep: Dispatch<SetStateAction<number>>;
  status: ProgressStatus;
  setStatus: Dispatch<SetStateAction<ProgressStatus>>;
  transactionSpeed: TxMode;
  fundManagerProxy?: string;
  handleTxSpeed: (e: SelectChangeEvent) => void;
};

const steps = [
  {
    label: 'Creating Transaction',
    description: `Creating Transaction for USDC Approval.`,
  },
  {
    label: 'Sign Transaction',
    description: 'Open your wallet and sign Transaction for USDC Approval.',
  },
  {
    label: 'USDC Approved',
    description: `You have approved USDC for further transactions.`,
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

export default function ApproveTxn({
  value,
  owner,
  setActiveStep: setTxnActiveStep,
  setStatus,
  status,
  transactionSpeed,
  handleTxSpeed,
  fundManagerProxy,
}: Props) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();
  const [initiated, setInitiated] = useState<boolean>(false);
  const { txnStatus, isTxnInitiated, watchTransaction, resetMonitor } = useTransactionMonitor();
  let count = 0;
  const chainId = useGetChainId();

  useEffect(() => {
    setStatus({
      success: { isSuccess: false },
      error: { isError: false },
      isLoading: false,
    });

    return () => resetMonitor();
  }, []);

  useEffect(() => {
    if (!isTxnInitiated && txnStatus && txnStatus?.status === 'txConfirmed') {
      handleTransactionStatus();
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
  }, [txnStatus, isTxnInitiated]);

  async function handleTransactionStatus() {
    setTimeout(async () => {
      const factoryAddress = fundManagerProxy
        ? fundManagerProxy
        : process.env.NEXT_PUBLIC_ALFRED_FACTORY_ADDRESS;
      const allowance = await checkAllowance(owner, factoryAddress);
      if (Number(value) <= Number(allowance)) {
        enqueueSnackbar('USDC amount approved successfully', {
          variant: 'success',
        });
        setActiveStep(2);
        setStatus({
          ...status,
          success: { isSuccess: true, message: 'USDC amount approved successfully' },
          isLoading: false,
        });
        setTxnActiveStep(1);
      } else {
        if (count < 20) {
          handleTransactionStatus();
          count++;
        } else {
          setInitiated(false);
          setStatus({
            ...status,
            error: { isError: true, message: 'USDC approval allowance is insufficient!' },
            isLoading: false,
          });
        }
      }
    }, 2000);
  }

  function handleApprovalClickRequest() {
    setInitiated(true);
    setTimeout(() => {
      setStatus({
        success: { isSuccess: false },
        error: { isError: false },
        isLoading: true,
      });
      resetMonitor();
      getUsdcApproval();
    }, 3000);
  }

  async function getUsdcApproval() {
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

    if (value && owner) {
      setActiveStep(1);
      const res = await web3ApprovalTransaction(
        value,
        owner,
        estimatedPriorityFee ? estimatedPriorityFee : 35 * 10 ** 9,
        fundManagerProxy,
        watchTransaction
      );

      if (res?.removed) {
        setActiveStep(2);
        setTxnActiveStep(1);
        setStatus({
          ...status,
          success: { isSuccess: true, message: 'USDC amount is already approved.' },
          isLoading: false,
        });
        enqueueSnackbar('USDC amount is already approved.', {
          variant: 'success',
        });
      }

      if (res?.error) {
        setInitiated(false);
        setStatus({
          ...status,
          error: {
            isError: true,
            message: `Something went wrong: ${JSON.stringify(res?.error)}`,
          },
          isLoading: false,
        });
      }
    } else {
      setInitiated(false);
      setStatus({
        ...status,
        error: { isError: true, message: `Please provide amount and user address` },
        isLoading: false,
      });
    }
  }

  return (
    <Box>
      {!initiated ? (
        <Stack direction="column" alignItems="center" justifyContent="center" gap={3}>
          <TransactionSimulation
            transactionSpeed={transactionSpeed}
            handleTxSpeed={handleTxSpeed}
            value={value}
            owner={owner}
          />
          <Button
            size="large"
            variant="contained"
            onClick={handleApprovalClickRequest}
            endIcon={<AssignmentTurnedInIcon />}
          >
            Get Approval
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
