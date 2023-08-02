import { DataTypes, PermitData, PermitTypes } from '../@types';
import { getPermit } from './getPermit';
import { signTypedData } from './signTypedData';
import { splitSig } from './splitSig';

type PermitChainCallResponse = {
  isSuccess?: boolean;
  permitRequired?: boolean;
  data?: PermitData;
  isErr?: boolean;
  msg: string;
};

export const getPermitChainCall = async (
  owner: string,
  permitValues: PermitTypes,
  provider: any
): Promise<PermitChainCallResponse> => {
  try {
    const permitData: any = await getPermit(permitValues);

    if (permitData?.permitRequired) {
      if (owner.toLowerCase() === permitData.signPermit['from'].toLowerCase()) {
        const signResult = await signTypedData(
          provider,
          permitData.signPermit['from'],
          permitData.signPermit['data'] as DataTypes
        );

        const { v, r, s } = splitSig(signResult.sig);

        return new Promise((resolve) => {
          resolve({
            isSuccess: true,
            msg: 'Permit Succesfull',
            data: { v, r, s, deadline: permitData['deadline'].toString() },
          });
        });
      }

      return new Promise((resolve) =>
        resolve({ isErr: true, msg: 'Owner address does not match with the signer address' })
      );
    } else if (permitData?.permitRequired === false) {
      return new Promise((resolve) => {
        resolve({
          permitRequired: false,
          msg: 'Permit already approved',
        });
      });
    }

    return new Promise((resolve) =>
      resolve({ isErr: true, msg: 'Something went wrong! Please try again' })
    );
  } catch (err: any) {
    console.log('err', err);

    return new Promise((resolve) =>
      resolve({
        isErr: true,
        msg: `Something went wrong! ${err?.message ? err?.message : 'Please try again'}`,
      })
    );
  }
};
