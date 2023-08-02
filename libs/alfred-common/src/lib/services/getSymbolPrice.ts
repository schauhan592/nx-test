import axios from 'axios';

export const getSymbolPrice = async (symbol: string) => {
  const base = process.env.NEXT_PUBLIC_CRYPTO_COMPARE_KEY;

  try {
    const resp = await axios.post(`${base}/data/price?fsym=${symbol}&tsyms=USD`);
    return resp.data;
  } catch (err) {
    console.log('Something went wrong', err);
  }
};
