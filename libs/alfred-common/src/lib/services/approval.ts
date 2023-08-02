import { ethers } from 'ethers';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import ERC20ABI from '../abi/ERC20ABI.json';
import checkAllowance from './checkAllowance';

async function web3ApprovalTransaction(
  value: number,
  owner: string,
  maxPriorityFeePerGas: number,
  fundManagerProxy: string | undefined,
  watchTransaction?: (hash: string) => void
): Promise<{ removed?: boolean; receipt?: any; error?: any; txnHash?: string }> {
  try {
    const address = process.env.NEXT_PUBLIC_POLYGON_USDC_ADDRESS;
    const web3 = new Web3(Web3.givenProvider);
    const contract = new web3.eth.Contract(ERC20ABI as AbiItem[], address);
    const decimals = await contract.methods?.decimals()?.call();
    const factoryAddress = fundManagerProxy
      ? fundManagerProxy
      : process.env.NEXT_PUBLIC_ALFRED_FACTORY_ADDRESS;
    const allowance = await checkAllowance(owner, factoryAddress);
    if (Number(value) <= Number(allowance)) {
      return new Promise((resolve) => {
        resolve({ removed: true });
      });
    } else {
      const amount = ethers.utils.parseUnits(String(value), decimals);
      return new Promise((resolve) => {
        contract.methods
          .approve(factoryAddress?.toLowerCase(), amount)
          .send({ from: owner, maxPriorityFeePerGas })
          .on('transactionHash', (hash: any) => {
            watchTransaction && watchTransaction(hash);
          })
          .on('error', (error: any) => {
            resolve({ error: error?.message });
          });
      });
    }
  } catch (e) {
    return new Promise((resolve) => {
      resolve({ error: JSON.stringify(e) });
    });
  }
}

export default web3ApprovalTransaction;
