import { BigNumber, ethers } from 'ethers';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import ERC20ABI from '../abi/ERC20ABI.json';
import { ETHEREUM_SYMBOL, POLYGON_SYMBOL, PRIMARY_DECIMALS } from '../utils';
import { maxPriorityFee } from './getMaxPriorityFee';
import { getSymbolPrice } from './getSymbolPrice';

type GasFee = {
  [key: string]: number;
  slow: number;
  medium: number;
  fast: number;
};

type GetGasFeeType = {
  priorityFee: any;
  estimatedPriorityFee: GasFee;
  gasFeeType: string;
  owner: string;
  contract: any;
  baseFee: number;
  factoryAddress: string | undefined;
  amount: BigNumber;
  USD: number;
};

export const estimateApprovalGasFee = async (value: number, owner: string, chainId: number) => {
  if (owner) {
    try {
      const address = process.env.NEXT_PUBLIC_POLYGON_USDC_ADDRESS;
      const factoryAddress = process.env.NEXT_PUBLIC_ALFRED_FACTORY_ADDRESS;
      const web3 = new Web3(Web3.givenProvider);
      const contract = new web3.eth.Contract(ERC20ABI as AbiItem[], address);
      const decimals = await contract.methods?.decimals()?.call();
      const amount = ethers.utils.parseUnits(String(value), decimals);
      const baseFee = Number(await web3.eth.getGasPrice());
      const priorityFee = await maxPriorityFee(chainId);
      const { USD } = await getSymbolPrice(chainId === 137 ? POLYGON_SYMBOL : ETHEREUM_SYMBOL);
      const gasFee = {
        slow: 0,
        medium: 0,
        fast: 0,
      };

      const estimatedPriorityFee = {
        slow: 35 * 10 ** 9,
        medium: 35 * 10 ** 9,
        fast: 35 * 10 ** 9,
      };

      if (priorityFee.estimate) {
        // Slow Gas Calculation
        gasFee['slow'] = await getGasFee({
          priorityFee,
          estimatedPriorityFee,
          gasFeeType: 'slow',
          owner,
          contract,
          baseFee,
          factoryAddress,
          amount,
          USD,
        });

        // Medium Gas Calculation
        gasFee['medium'] = await getGasFee({
          priorityFee,
          estimatedPriorityFee,
          gasFeeType: 'medium',
          owner,
          contract,
          baseFee,
          factoryAddress,
          amount,
          USD,
        });

        // Fast Gas Calculation
        gasFee['fast'] = await getGasFee({
          priorityFee,
          estimatedPriorityFee,
          gasFeeType: 'fast',
          owner,
          contract,
          baseFee,
          factoryAddress,
          amount,
          USD,
        });
      }

      return {
        slow: `USD ${gasFee['slow']}`,
        medium: `USD ${gasFee['medium']}`,
        fast: `USD ${gasFee['fast']}`,
      };
    } catch (err) {
      console.log('err', err);
      return 'Unable to calculate Gas Price';
    }
  } else {
    return 'Unable to calculate Gas Price';
  }
};

async function getGasFee({
  priorityFee,
  estimatedPriorityFee,
  gasFeeType,
  owner,
  contract,
  baseFee,
  factoryAddress,
  amount,
  USD,
}: GetGasFeeType) {
  if (gasFeeType === 'slow') {
    estimatedPriorityFee['slow'] = priorityFee.estimate.slowEstimate;
  } else if (gasFeeType === 'medium') {
    estimatedPriorityFee['medium'] = priorityFee.estimate.averageEstimate;
  } else if (gasFeeType === 'fast') {
    estimatedPriorityFee['fast'] = priorityFee.estimate.fastEstimate;
  }

  const totalGasPrice = Number(
    ethers.utils.formatUnits(baseFee + Number(estimatedPriorityFee[gasFeeType]), PRIMARY_DECIMALS)
  );

  const estimate = await contract.methods
    .approve(factoryAddress?.toLowerCase(), amount)
    .estimateGas({ from: owner });
  const val = totalGasPrice * estimate * USD;
  return Math.round((val + Number.EPSILON) * 10000) / 10000;
}
