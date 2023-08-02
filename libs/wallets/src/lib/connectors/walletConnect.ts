import { initializeConnector } from '@web3-react/core';
import { WalletConnect } from '@web3-react/walletconnect';
import { ethereumRpcMap } from '../utils/helpers';

export const [walletConnect, walletConnecthooks] = initializeConnector<WalletConnect>(
  (actions) =>
    new WalletConnect({
      actions,
      options: {
        rpc: {
          1: ethereumRpcMap[1],
          137: ethereumRpcMap[137],
          42161: ethereumRpcMap[42161],
        },
      },
    })
);
