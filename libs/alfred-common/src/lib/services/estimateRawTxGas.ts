import { ethers } from 'ethers';
import Web3 from 'web3';
import { TXN_TYPE } from '../@types';
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
  baseFee: number;
  USD: number;
  rawTx: TXN_TYPE;
};

export const estimateRawTxGasFee = async (rawTx: TXN_TYPE, owner: string, chainId: number) => {
  if (owner && rawTx) {
    try {
      const web3 = new Web3(Web3.givenProvider);
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
          baseFee,
          USD,
          rawTx,
        });

        // Medium Gas Calculation
        gasFee['medium'] = await getGasFee({
          priorityFee,
          estimatedPriorityFee,
          gasFeeType: 'medium',
          baseFee,
          USD,
          rawTx,
        });

        // Fast Gas Calculation
        gasFee['fast'] = await getGasFee({
          priorityFee,
          estimatedPriorityFee,
          gasFeeType: 'fast',
          baseFee,
          USD,
          rawTx,
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
  baseFee,
  USD,
  rawTx,
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

  const gasLimit = Number(ethers?.BigNumber?.from(rawTx?.gasLimit).toString());

  const val = totalGasPrice * gasLimit * USD;
  return Math.round((val + Number.EPSILON) * 10000) / 10000;
}
