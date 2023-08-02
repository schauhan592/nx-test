import { ethers } from 'ethers';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import ERC20ABI from '../abi/ERC20ABI.json';

async function checkAllowance(owner: string, factoryAddress: string | undefined) {
  const address = process.env.NEXT_PUBLIC_POLYGON_USDC_ADDRESS;
  const web3 = new Web3(Web3.givenProvider);
  const contract = new web3.eth.Contract(ERC20ABI as AbiItem[], address);
  const decimals = await contract.methods?.decimals()?.call();

  const allowance = ethers?.utils?.formatUnits(
    await contract.methods?.allowance(owner, factoryAddress)?.call(),
    decimals
  );

  return allowance;
}

export default checkAllowance;
