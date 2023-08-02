import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useGetChainId } from '../hooks';
import { useWallet } from '@alfred/wallets';
import { SelectChangeEvent } from '@mui/material/Select';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  AddFundsType,
  AddMoreLiquidityTypes,
  DeployStrategyTypes,
  PermitData,
  Pool,
  PositionsData,
  TxMode,
  TxnSubStep,
  VaultRedeemSharesType,
  VaultRemoveLiquidityType,
} from '../@types';
import {
  CopyTradeCreateVaultPayload,
  VaultClosePositionsPayload,
  VaultRedeemCopyTradeSharesPayload,
} from '../@types/copy-trade';
import { useTransactionMonitor } from '../contexts';
import AddFunds from './AddFunds';

const ErrorBoundary = dynamic(() => import('@sdf/base').then((mod) => mod.ErrorBoundary), {
  ssr: false,
});
const DeployStepper = dynamic(() => import('./DeployStepper'));
const PermitTxn = dynamic(() => import('./PermitTxn'));
const DeployStrategy = dynamic(() => import('./DeployStrategy'));
const RemoveLiquidity = dynamic(() => import('./RemoveLiquidity'));
const RedeemShare = dynamic(() => import('./RedeemShare'));
const CopyTradeTxn = dynamic(() => import('./CopyTradeTxn'));
const ClosePosition = dynamic(() => import('./ClosePosition'));
const RedeemTradesShares = dynamic(() => import('./RedeemTradesShares'));
const InvestStrategy = dynamic(() => import('./InvestStrategy'));

interface DialogTitleProps {
  id: string;
  title: string;
  onClose: () => void;
}

type BuilderMode =
  | 'invest'
  | 'deploy'
  | 'withdraw'
  | 'copy-trade'
  | 'copy-trade-redeem'
  | 'add-funds';

type Props = {
  title: string;
  isOpen: boolean;
  steps: TxnSubStep[];
  activeStep: number;
  handleClose(): void;
  mode?: BuilderMode;
  positions?: Pool[];
  setActiveStep: Dispatch<SetStateAction<number>>;
  basicInfo: {
    fundManagerProxy?: string;
    amountToBeDeployed: { amount: number; currency: string };
    strategyName?: string;
    externalPositionProxy?: string;
    inUsdc?: boolean;
    browsePermitData?: PermitData | undefined;
    buildPermitData?: PermitData | undefined;
    copyTradePermitData?: PermitData | undefined;
    vaultAddress?: string;
    maxInvestmentAmount?: number;
    maxOpenPosition?: number;
    positionFactor?: number;
    followedAddresses?: string[];
    symbol?: string;
    totalAmount?: number;
  };
  setBuildPermitData?: Dispatch<SetStateAction<PermitData | undefined>>;
  setBrowsePermitData?: Dispatch<SetStateAction<PermitData | undefined>>;
  setCopyTradePermitData?: Dispatch<SetStateAction<PermitData | undefined>>;
};
interface ChildComponentProps extends Props {
  walletAddress: string;
  deployPayload?: DeployStrategyTypes;
  investPayload?: AddMoreLiquidityTypes;
  copyTradePayload?: CopyTradeCreateVaultPayload;
  removeLiquidityPayload?: VaultRemoveLiquidityType;
  redeemSharePayload?: VaultRedeemSharesType;
  redeemSharePayloadData?: VaultRedeemCopyTradeSharesPayload;
  closePositionPayload?: VaultClosePositionsPayload;
  addFundsPayload?: AddFundsType;
  status: ProgressStatus;
  setStatus: Dispatch<SetStateAction<ProgressStatus>>;
  transactionSpeed: TxMode;
  handleTxSpeed: (e: SelectChangeEvent) => void;
  fundManagerProxy: string | undefined;
  setBuildPermitData?: Dispatch<SetStateAction<PermitData | undefined>>;
  setBrowsePermitData?: Dispatch<SetStateAction<PermitData | undefined>>;
}

// TODO: move this type to @types
export type ProgressStatus = {
  isLoading: boolean;
  error: { isError: boolean; message?: string };
  success: { isSuccess: boolean; message?: string };
};

export const Components = ({
  activeStep,
  basicInfo,
  walletAddress,
  setActiveStep,
  deployPayload,
  investPayload,
  copyTradePayload,
  closePositionPayload,
  redeemSharePayloadData,
  addFundsPayload,
  mode,
  status,
  setStatus,
  removeLiquidityPayload,
  redeemSharePayload,
  transactionSpeed,
  fundManagerProxy,
  handleTxSpeed,
  setBuildPermitData,
  setBrowsePermitData,
  setCopyTradePermitData,
}: ChildComponentProps) => {
  switch (activeStep) {
    case 0:
      if (mode === 'copy-trade-redeem') {
        return (
          <>
            <Divider sx={{ margin: '-18px 0 18px 0' }} />
            <ClosePosition
              payload={closePositionPayload}
              setActiveStep={setActiveStep}
              walletAddress={walletAddress}
              status={status}
              setStatus={setStatus}
              transactionSpeed={transactionSpeed}
              handleTxSpeed={handleTxSpeed}
            />
          </>
        );
      } else {
        return (
          <>
            <Divider sx={{ margin: '-18px 0 18px 0' }} />
            <PermitTxn
              value={basicInfo?.amountToBeDeployed?.amount}
              owner={walletAddress}
              setActiveStep={setActiveStep}
              status={status}
              setStatus={setStatus}
              fundManagerProxy={fundManagerProxy}
              setBuildPermitData={setBuildPermitData}
              setBrowsePermitData={setBrowsePermitData}
              setCopyTradePermitData={setCopyTradePermitData}
              isCopyTrade={mode === 'copy-trade' || mode === 'add-funds'}
            />
          </>
        );
      }

    case 1:
      if (mode === 'deploy') {
        return (
          <>
            <Divider sx={{ margin: '-18px 0 18px 0' }} />
            <DeployStrategy
              payload={deployPayload}
              setActiveStep={setActiveStep}
              walletAddress={walletAddress}
              status={status}
              setStatus={setStatus}
              transactionSpeed={transactionSpeed}
              handleTxSpeed={handleTxSpeed}
            />
          </>
        );
      } else if (mode === 'invest') {
        return (
          <>
            <Divider sx={{ margin: '-18px 0 18px 0' }} />
            <InvestStrategy
              payload={investPayload}
              setActiveStep={setActiveStep}
              walletAddress={walletAddress}
              status={status}
              setStatus={setStatus}
              transactionSpeed={transactionSpeed}
              handleTxSpeed={handleTxSpeed}
            />
          </>
        );
      } else if (mode === 'copy-trade') {
        return (
          <>
            <Divider sx={{ margin: '-18px 0 18px 0' }} />
            <CopyTradeTxn
              payload={copyTradePayload}
              setActiveStep={setActiveStep}
              walletAddress={walletAddress}
              status={status}
              setStatus={setStatus}
              transactionSpeed={transactionSpeed}
              handleTxSpeed={handleTxSpeed}
            />
          </>
        );
      } else if (mode === 'add-funds') {
        return (
          <>
            <Divider sx={{ margin: '-18px 0 18px 0' }} />
            <AddFunds
              payload={addFundsPayload}
              setActiveStep={setActiveStep}
              walletAddress={walletAddress}
              status={status}
              setStatus={setStatus}
              transactionSpeed={transactionSpeed}
              handleTxSpeed={handleTxSpeed}
            />
          </>
        );
      } else {
        return (
          <>
            <Divider sx={{ margin: '-18px 0 18px 0' }} />
            <RedeemTradesShares
              payload={redeemSharePayloadData}
              setActiveStep={setActiveStep}
              walletAddress={walletAddress}
              status={status}
              setStatus={setStatus}
              transactionSpeed={transactionSpeed}
              handleTxSpeed={handleTxSpeed}
            />
          </>
        );
      }

    case 2:
      return (
        <>
          <Divider sx={{ margin: '-18px 0 18px 0' }} />
          <RemoveLiquidity
            walletAddress={walletAddress}
            payload={removeLiquidityPayload}
            setActiveStep={setActiveStep}
            status={status}
            setStatus={setStatus}
            transactionSpeed={transactionSpeed}
            handleTxSpeed={handleTxSpeed}
          />
        </>
      );

    case 3:
      return (
        <>
          <Divider sx={{ margin: '-18px 0 18px 0' }} />
          <RedeemShare
            walletAddress={walletAddress}
            payload={redeemSharePayload}
            setActiveStep={setActiveStep}
            status={status}
            setStatus={setStatus}
            transactionSpeed={transactionSpeed}
            handleTxSpeed={handleTxSpeed}
          />
        </>
      );

    default:
      return (
        <>
          <Divider sx={{ margin: '-18px 0 18px 0' }} />
          <PermitTxn
            value={basicInfo?.amountToBeDeployed?.amount}
            owner={walletAddress}
            setActiveStep={setActiveStep}
            status={status}
            setStatus={setStatus}
            setBuildPermitData={setBuildPermitData}
            setBrowsePermitData={setBrowsePermitData}
          />
        </>
      );
  }
};

function CustomDialogTitle(props: DialogTitleProps) {
  const { onClose, title } = props;

  return (
    <DialogTitle>
      <Stack direction="row" alignItems="center" justifyContent="space-between" pl={1} mt={1}>
        <Typography variant="h6">{title}</Typography>

        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </Stack>
      {/* <Divider sx={{ my: 2 }} /> */}
    </DialogTitle>
  );
}

export default function TxnBuilderDialog(props: Props) {
  const {
    title,
    isOpen,
    handleClose,
    steps,
    activeStep,
    positions,
    basicInfo,
    mode,
    setBuildPermitData,
    setBrowsePermitData,
  } = props;

  const { handleOpenConnectModal, isActive, account } = useWallet();
  const [status, setStatus] = useState<ProgressStatus>({
    success: { isSuccess: false },
    error: { isError: false },
    isLoading: false,
  });
  const [transactionSpeed, setTransactionSpeed] = useState<TxMode>('medium');
  const { resetMonitor } = useTransactionMonitor();
  const { push } = useRouter();
  const chainId = useGetChainId();

  useEffect(() => {
    setStatus({
      success: { isSuccess: false },
      error: { isError: false },
      isLoading: false,
    });
    resetMonitor();
  }, [activeStep]);

  function handleTxSpeed(e: SelectChangeEvent) {
    setTransactionSpeed(e.target.value as TxMode);
  }

  function deployPayloadData() {
    if (positions) {
      const positionsData: PositionsData[] = positions?.map((position) => {
        return {
          tokenAddress: position?.token?.map((token) => token?.id || token?.address || '') || [],
          fee: Number(position?.feeTier),
          protocol: 'uniswapv3',
          amount: Number(position?.tickData?.amount0Usdc) + Number(position?.tickData?.amount1Usdc),
          upperTick: position?.tickData?.upperTick || 0,
          lowerTick: position?.tickData?.lowerTick || 0,
          minPrice: Number(position?.tickData?.minPrice) || 0,
          maxPrice: Number(position?.tickData?.maxPrice) || 0,
          poolAddress: position?.id,
        };
      });

      const payload: DeployStrategyTypes = {
        name: basicInfo?.strategyName as string,
        symbol: 'ALF',
        chainId: chainId,
        totalAmount: basicInfo?.amountToBeDeployed?.amount,
        walletAddress: account || '',
        positionsData: positionsData,
        v: basicInfo?.buildPermitData?.v,
        r: basicInfo?.buildPermitData?.r,
        s: basicInfo?.buildPermitData?.s,
        deadline: basicInfo?.buildPermitData?.deadline,
      };

      return payload;
    }
  }

  function investPayloadData() {
    const payload: AddMoreLiquidityTypes = {
      fundManagerProxy: basicInfo?.fundManagerProxy as string,
      name: basicInfo?.strategyName as string,
      chainId: chainId,
      totalAmount: basicInfo?.amountToBeDeployed?.amount,
      walletAddress: account || '',
      v: basicInfo?.browsePermitData?.v,
      r: basicInfo?.browsePermitData?.r,
      s: basicInfo?.browsePermitData?.s,
      deadline: basicInfo?.browsePermitData?.deadline,
    };

    return payload;
  }

  function removeLiquidityPayloadData() {
    const payload: VaultRemoveLiquidityType = {
      chainId: chainId,
      externalPositionProxy: basicInfo?.externalPositionProxy as string,
      walletAddress: account || '',
      inUsdc: basicInfo?.inUsdc as boolean,
      fundManagerProxy: basicInfo?.fundManagerProxy as string,
    };

    return payload;
  }

  function copyTradePayload() {
    if (basicInfo?.copyTradePermitData?.v) {
      const payload: CopyTradeCreateVaultPayload = {
        name: basicInfo?.strategyName || 'My Strategy',
        symbol: basicInfo?.symbol || 'ALF',
        chainId: chainId,
        totalAmount: basicInfo?.amountToBeDeployed?.amount,
        walletAddress: account || '',
        v: String(basicInfo?.copyTradePermitData?.v),
        r: String(basicInfo?.copyTradePermitData?.r),
        s: String(basicInfo?.copyTradePermitData?.s),
        deadline: String(basicInfo?.copyTradePermitData?.deadline),
        maxInvestmentAmount: basicInfo?.maxInvestmentAmount || 0,
        positionFactor: basicInfo?.positionFactor || 100,
        maxOpenPosition: basicInfo?.maxOpenPosition || 0,
        followedAddresses: basicInfo?.followedAddresses || [],
      };

      return payload;
    } else {
      const payload: CopyTradeCreateVaultPayload = {
        name: basicInfo?.strategyName || 'My Strategy',
        symbol: basicInfo?.symbol || 'ALF',
        chainId: chainId,
        totalAmount: basicInfo?.amountToBeDeployed?.amount,
        walletAddress: account || '',
        maxInvestmentAmount: basicInfo?.maxInvestmentAmount || 0,
        positionFactor: basicInfo?.positionFactor || 100,
        maxOpenPosition: basicInfo?.maxOpenPosition || 0,
        followedAddresses: basicInfo?.followedAddresses || [],
      };

      return payload;
    }
  }

  function addFundsPayloadData() {
    const payload: AddFundsType = {
      fundManagerProxy: basicInfo?.fundManagerProxy || '',
      chainId: chainId,
      walletAddress: account || '',
      totalAmount: basicInfo?.amountToBeDeployed?.amount || 0,
      v: String(basicInfo?.copyTradePermitData?.v),
      r: String(basicInfo?.copyTradePermitData?.r),
      s: String(basicInfo?.copyTradePermitData?.s),
      deadline: String(basicInfo?.copyTradePermitData?.deadline),
    };

    return payload;
  }

  function redeemSharePayloadData() {
    const payload: VaultRedeemSharesType = {
      chainId: chainId,
      walletAddress: account || '',
      payoutAsset: process.env.NEXT_PUBLIC_POLYGON_USDC_ADDRESS as string,
      vaultAddress: basicInfo?.vaultAddress as string,
    };

    return payload;
  }

  function closePositionPayload() {
    return {
      fundManagerProxy: basicInfo?.fundManagerProxy || '',
      chainId: chainId,
      walletAddress: account || '',
    };
  }

  function redeemCopyTradeSharesPayload() {
    return {
      redeemInUsdc: true,
      fundManagerProxy: basicInfo?.fundManagerProxy || '',
      chainId: chainId,
      walletAddress: account || '',
    };
  }

  function handleGoToStrategy() {
    push(`/user/${account}?tab=strategies`);
  }

  function handleCloseWithSuccess() {
    resetMonitor();
    handleClose();
    push(getPath());
  }

  function getPath() {
    switch (mode) {
      case 'add-funds':
        return `/copy-trading/dashboard?mode=trades&account=${account}`;

      case 'copy-trade':
        return `/copy-trading/dashboard?mode=trades&account=${account}`;

      case 'copy-trade-redeem':
        return `/copy-trading/dashboard?mode=trades&account=${account}`;

      case 'deploy':
        return `/user/${account}?tab=strategies`;

      case 'invest':
        return `/user/${account}?tab=strategies`;

      case 'withdraw':
        return `/user/${account}?tab=strategies`;

      default:
        return '/';
    }
  }

  const componentProps = {
    ...props,
    walletAddress: account || '',
    status: status,
    setStatus: setStatus,
    ...(mode === 'deploy' && { deployPayload: deployPayloadData() }),
    ...(mode === 'invest' && { investPayload: investPayloadData() }),
    ...(mode === 'add-funds' && { addFundsPayload: addFundsPayloadData() }),
    ...(mode === 'copy-trade' && { copyTradePayload: copyTradePayload() }),
    ...(mode === 'copy-trade-redeem' && {
      closePositionPayload: closePositionPayload(),
      redeemSharePayloadData: redeemCopyTradeSharesPayload(),
    }),
    removeLiquidityPayload: removeLiquidityPayloadData(),
    redeemSharePayload: redeemSharePayloadData(),
    transactionSpeed,
    setBuildPermitData,
    setBrowsePermitData,
    handleTxSpeed,
    fundManagerProxy: basicInfo?.fundManagerProxy,
  };

  return (
    <Dialog aria-labelledby="customized-dialog-title" open={isOpen}>
      <CustomDialogTitle
        id="customized-dialog-title"
        onClose={
          !status?.isLoading
            ? handleClose
            : () => {
                return;
              }
        }
        title={title}
      />
      <ErrorBoundary>
        <DialogContent dividers sx={{ display: 'flex', alignItems: 'flex-start', paddingY: '0px' }}>
          <Stack
            direction="column"
            py={0}
            sx={{
              width: '30vw',
              minWidth: '400px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <DeployStepper
              componentProps={componentProps}
              steps={steps}
              activeStep={activeStep}
              isWithdrawel={activeStep > 1 ? true : false}
            />
            <Stack
              direction="column"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '96%' }}
              spacing={2}
            >
              <Box sx={{ width: '100%' }}>
                {!status?.isLoading && status?.error?.isError ? (
                  <Alert severity="error" variant="outlined">
                    <AlertTitle>Error</AlertTitle>
                    <Typography sx={{ fontSize: '13px' }} variant="body2">
                      {status?.error?.message}
                    </Typography>
                  </Alert>
                ) : (
                  !status?.isLoading &&
                  status?.success?.isSuccess && (
                    <Alert severity="success" variant="outlined">
                      <AlertTitle>Success</AlertTitle>
                      <Typography sx={{ fontSize: '13px' }} variant="body2">
                        {status?.success?.message}
                      </Typography>
                    </Alert>
                  )
                )}
              </Box>
              {/* {walletAddress && (
                <Box>
                  <Components {...componentProps} />
                </Box>
              )} */}
            </Stack>
          </Stack>
        </DialogContent>
      </ErrorBoundary>

      <DialogActions sx={{ paddingX: '32px !important' }}>
        {(mode === 'deploy' || mode === 'invest' || mode === 'withdraw') &&
        (activeStep === 1 || activeStep === 2) &&
        status?.success?.isSuccess ? (
          mode === 'withdraw' ? (
            <Button fullWidth variant="contained" onClick={handleCloseWithSuccess}>
              Done
            </Button>
          ) : (
            <Button variant="contained" onClick={handleGoToStrategy} fullWidth>
              Go To Strategy
            </Button>
          )
        ) : (mode === 'copy-trade-redeem' || mode === 'copy-trade' || mode === 'add-funds') &&
          (activeStep === 1 || activeStep === 2) &&
          status?.success?.isSuccess ? (
          <Button fullWidth variant="contained" onClick={handleCloseWithSuccess}>
            Done
          </Button>
        ) : (
          <Button
            variant="outlined"
            disabled={status?.isLoading}
            onClick={handleClose}
            sx={{ width: '100%' }}
          >
            Cancel
          </Button>
        )}
        {!isActive && (
          <Button fullWidth variant="contained" onClick={handleOpenConnectModal}>
            Connect Wallet
          </Button>
        )}
        {/* <Button variant="contained">{steps[activeStep]?.label}</Button> */}
      </DialogActions>
    </Dialog>
  );
}
