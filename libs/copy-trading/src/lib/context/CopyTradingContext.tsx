import { PermitData } from '@alfred/alfred-common';
import { ReactNode, createContext, useContext, useState } from 'react';
import { CopyTradeConfig, CopyTradingContextValues } from '../@types';

type CopyTradingContextProviderProps = {
  children: ReactNode;
};

const initialValues: CopyTradingContextValues = {
  isModalOpen: false,
  openTxnBuilder: false,
  copyTradePermitData: undefined,
  tradeConfig: undefined,
  traderAddress: undefined,
  isCustomAddressModalOpen: false,
  setIsCustomAddressModalOpen: () => {
    return;
  },
  setTraderAddress: () => {
    return;
  },
  setTradeConfig: () => {
    return;
  },
  setCopyTradePermitData: () => {
    return;
  },
  setIsModalOpen: () => {
    return;
  },
  setOpenTxnBuilder: () => {
    return;
  },
};

const CopyTradingContext = createContext(initialValues);

function CopyTradingContextProvider({ children }: CopyTradingContextProviderProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [openTxnBuilder, setOpenTxnBuilder] = useState<boolean>(false);
  const [copyTradePermitData, setCopyTradePermitData] = useState<PermitData | undefined>(undefined);
  const [tradeConfig, setTradeConfig] = useState<CopyTradeConfig | undefined>(undefined);
  const [traderAddress, setTraderAddress] = useState<string | undefined>(undefined);
  const [isCustomAddressModalOpen, setIsCustomAddressModalOpen] = useState<boolean>(false);

  return (
    <CopyTradingContext.Provider
      value={{
        isModalOpen,
        setIsModalOpen,
        openTxnBuilder,
        setOpenTxnBuilder,
        copyTradePermitData,
        setCopyTradePermitData,
        tradeConfig,
        setTradeConfig,
        traderAddress,
        setTraderAddress,
        setIsCustomAddressModalOpen,
        isCustomAddressModalOpen,
      }}
    >
      {children}
    </CopyTradingContext.Provider>
  );
}

export { CopyTradingContext, CopyTradingContextProvider };
export const useCopyTradingContext = () => useContext(CopyTradingContext);
