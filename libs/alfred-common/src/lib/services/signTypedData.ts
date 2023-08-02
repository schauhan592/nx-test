import { ethers } from 'ethers';
import { DataTypes, SignTypedDataResponse } from '../@types';

export const signTypedData = async (
  provider: ethers.providers.Web3Provider,
  from: string,
  data: DataTypes
): Promise<SignTypedDataResponse> => {
  const signer = provider.getSigner();

  delete data?.types['EIP712Domain'];

  const signature = await signer._signTypedData(data?.domain, data?.types, data?.message);

  const sig0 = signature.substring(2);
  const r = '0x' + sig0.substring(0, 64);
  const s = '0x' + sig0.substring(64, 128);
  const v = parseInt(sig0.substring(128, 130), 16);

  return {
    data,
    sig: signature,
    v,
    r,
    s,
  };
};
