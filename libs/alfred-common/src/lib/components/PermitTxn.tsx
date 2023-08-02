import { useWallet } from '@alfred/wallets';
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
import { PermitData } from '../@types';
import { useTransactionMonitor } from '../contexts';
import { useGetChainId } from '../hooks/index';
import { getPermitChainCall } from '../services';
import { ProgressStatus } from './TxnBuilderDialog';

type Props = {
  value: number;
  owner: string;
  isCopyTrade?: boolean;
  setActiveStep: Dispatch<SetStateAction<number>>;
  status: ProgressStatus;
  setStatus: Dispatch<SetStateAction<ProgressStatus>>;
  fundManagerProxy?: string;
  setBuildPermitData?: Dispatch<SetStateAction<PermitData | undefined>>;
  setBrowsePermitData?: Dispatch<SetStateAction<PermitData | undefined>>;
  setCopyTradePermitData?: Dispatch<SetStateAction<PermitData | undefined>>;
};

const steps = [
  {
    label: 'USDC Approval',
    description: `Confirm transaction from your wallet`,
  },
  {
    label: 'Approval Successful',
    description: `You have given approval for accessing your assets`,
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

export default function Permit({
  value,
  owner,
  isCopyTrade,
  setActiveStep: setTxnActiveStep,
  setStatus,
  status,
  fundManagerProxy,
  setBuildPermitData,
  setBrowsePermitData,
  setCopyTradePermitData,
}: Props) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();
  const [initiated, setInitiated] = useState<boolean>(false);
  const { resetMonitor } = useTransactionMonitor();
  const chainId = useGetChainId();
  const { provider } = useWallet();

  useEffect(() => {
    setStatus({
      success: { isSuccess: false },
      error: { isError: false },
      isLoading: false,
    });

    return () => resetMonitor();
  }, []);

  function handlePermitClickRequest() {
    setInitiated(true);
    setTimeout(() => {
      setStatus({
        success: { isSuccess: false },
        error: { isError: false },
        isLoading: true,
      });
      resetMonitor();
      if (provider) getPermit();
    }, 3000);
  }

  async function getPermit() {
    if (value && owner) {
      const permitData = {
        spenderAddress: fundManagerProxy
          ? fundManagerProxy
          : isCopyTrade
          ? (process.env.NEXT_PUBLIC_ALFRED_ARBITRUM_FACTORY_ADDRESS as string)
          : (process.env.NEXT_PUBLIC_ALFRED_FACTORY_ADDRESS as string),
        amount: value,
        chainId: chainId,
        walletAddress: owner,
      };

      const res = await getPermitChainCall(owner, permitData, provider);

      if (res?.permitRequired === false) {
        setActiveStep(1);
        setTxnActiveStep(1);
        setStatus({
          ...status,
          success: { isSuccess: true, message: res?.msg },
          isLoading: false,
        });
        enqueueSnackbar(res?.msg, {
          variant: 'success',
        });
      }

      if (res?.isSuccess) {
        fundManagerProxy ? setBrowsePermitData?.(res?.data) : setBuildPermitData?.(res?.data);
        if (isCopyTrade) {
          setCopyTradePermitData?.(res?.data);
        }
        enqueueSnackbar(res?.msg, {
          variant: 'success',
        });
        setActiveStep(1);
        setTxnActiveStep(1);
        setStatus({
          ...status,
          success: { isSuccess: true, message: res?.msg },
          isLoading: false,
        });
      }

      if (res?.isErr) {
        setInitiated(false);
        setStatus({
          ...status,
          error: {
            isError: true,
            message: `${res?.msg}`,
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
          <Button
            fullWidth
            sx={{ margin: '5px 0' }}
            size="small"
            variant="contained"
            onClick={handlePermitClickRequest}
            endIcon={<AssignmentTurnedInIcon />}
          >
            Get Permit
          </Button>
        </Stack>
      ) : (
        <Stepper sx={{ marginLeft: '12px' }} activeStep={activeStep} orientation="vertical">
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel
                StepIconComponent={ColorlibStepIcon}
                // optional={index === 1 ? <Typography variant="caption">Last step</Typography> : null}
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
