import { axiosInstance } from '@sdf/base';
import { CopyTradeCreateVaultPayload } from '../@types/copy-trade';

export default async function copyTradeCreateVault(metadata: CopyTradeCreateVaultPayload) {
  const res = await axiosInstance.post('/fund-manage/vaultcreationargs-withcopytrade', {
    ...metadata,
  });

  return res.data;
}
