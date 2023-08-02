import { PoolToken, Strategy } from '../@types';

export default function getTokens(strategy: Strategy) {
  let tokens: PoolToken[] = [];
  strategy?.pools?.forEach((pool) => {
    tokens = [...tokens, ...pool.token];
  });

  return tokens;
}
