import { useWallet } from '@alfred/wallets';
import { useRouter } from 'next/router';
import { PRIMARY_ARBITRUM_CHAIN_ID, PRIMARY_CHAIN_ID } from '../utils';

export default function useGetChainId() {
  const { chainId, isActive } = useWallet();
  const { pathname } = useRouter();
  const isCopyTradeSection = pathname.split('/')[1] === 'copy-trading';

  if (isActive && chainId) {
    return chainId;
  }
  return isCopyTradeSection ? PRIMARY_ARBITRUM_CHAIN_ID : chainId || PRIMARY_CHAIN_ID;
}
