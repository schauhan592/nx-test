// import { ethers } from 'ethers';
import { BigNumber, ethers } from 'ethers';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import ERC20ABI from '../abi/ERC20ABI.json';
import ERC20ARBITRUMABI from '../abi/ERC20ARBITRUMABI.json';
import { CHAIN_TYPE } from '@alfred/wallets';

export const getUSDCBalance = async (owner: string, chain?: CHAIN_TYPE) => {
  if (owner) {
    let address;
    let abi;
    const decimals = BigNumber.from(6);
    if (chain === CHAIN_TYPE.ARBITRUM) {
      address = process.env.NEXT_PUBLIC_ARBITRUM_USDC_ADDRESS;
      abi = ERC20ARBITRUMABI as AbiItem[];
    } else {
      address = process.env.NEXT_PUBLIC_POLYGON_USDC_ADDRESS;
      abi = ERC20ABI as AbiItem[];
    }
    try {
      const web3 = new Web3(Web3.givenProvider);
      const contract = await new web3.eth.Contract(abi, address);
      const balance = await contract.methods.balanceOf(owner?.toLowerCase()).call();
      return ethers.utils.formatUnits(balance, decimals);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  } else {
    return 0;
  }
};
