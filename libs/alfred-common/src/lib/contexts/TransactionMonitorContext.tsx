import checkTransactionStatus from '@0xdeepak/transaction-monitor';
import { TransactionEventCode } from '@0xdeepak/transaction-monitor/types';
import { ReactNode, createContext, useContext, useState } from 'react';
import { useGetChainId } from '../hooks';

type InitialValuesType = {
  resetMonitor(): void;
  watchTransaction(hash: string): void;
  txnStatus: TxnStatus;
  isTxnInitiated: boolean;
};

type TxnStatus = {
  data: any;
  status: TransactionEventCode;
};

type Props = {
  children: ReactNode;
};

const initialValues: InitialValuesType = {
  isTxnInitiated: false,
  txnStatus: { data: undefined, status: 'txRequest' },
  watchTransaction: () => {
    return;
  },
  resetMonitor: () => {
    return;
  },
};

const TransactionMonitorContext = createContext(initialValues);

function TransactionMonitorProvider({ children }: Props) {
  const [txnStatus, setTxnStatus] = useState<TxnStatus>(initialValues.txnStatus);
  const [isTxnInitiated, setIsTxnInitiated] = useState<boolean>(false);
  const chainId = useGetChainId();

  async function watchTransaction(hash: string) {
    const res = await checkTransactionStatus({
      txHash: hash,
      chainId: chainId,
      maxConfirmationBlocks: 50,
    });
    if (res?.status === 'txConfirmed') {
      setTxnStatus({ data: undefined, status: 'txConfirmed' });
      setIsTxnInitiated(false);
    } else if (res?.status === 'txFailed') {
      setTxnStatus({ data: undefined, status: 'txFailed' });
      setIsTxnInitiated(false);
    }
  }

  console.log(txnStatus);

  function resetMonitor() {
    setTxnStatus(initialValues.txnStatus);
    setIsTxnInitiated(false);
  }

  return (
    <TransactionMonitorContext.Provider
      value={{ watchTransaction, txnStatus, isTxnInitiated, resetMonitor }}
    >
      {children}
    </TransactionMonitorContext.Provider>
  );
}

export const useTransactionMonitor = () => useContext(TransactionMonitorContext);

export default TransactionMonitorProvider;
