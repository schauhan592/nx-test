import axios from 'axios';

export const getLatestStrategy = (walletAddress: string) => {
  try {
    axios.post(`${process.env.NEXT_PUBLIC_WORKFLOW_API_KEY}/reSend`, {
      walletAddress,
    });
  } catch (err) {
    console.log('Something went wrong', err);
  }
};
