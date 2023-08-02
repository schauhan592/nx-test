import { request, gql } from 'graphql-request';
import { MeiliSearch } from 'meilisearch';

const query = gql`
  query getPools($skip: Int!) {
    pools(orderBy: totalValueLockedUSD, orderDirection: desc, skip: $skip) {
      id
      createdAtTimestamp
      feeTier
      liquidity
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
      ticks {
        price0
        price1
      }
      tick
      totalValueLockedUSD
      totalValueLockedToken0
      totalValueLockedToken1
      txCount
    }
  }
`;

const categories = ['MOST_POPULAR', 'RECENTLY_ADDED', 'STABLE_COIN_LP'];

export const getPools = async () => {
  const pools: Array<any> = [];
  const poolsQueue: Array<any> = [];

  const client = new MeiliSearch({
    host: String(process.env.MEILI_SEARCH_HOST),
    apiKey: process.env.MEILI_SEARCH_API_KEY,
  });

  // An index is where the documents are stored.

  //Prepare
  await client.deleteIndex('POOLS');
  const index = client.index('POOLS');
  for (let i = 0; i <= 10; i++) {
    const data = request('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3', query, {
      skip: i * 100,
    });
    poolsQueue.push(data);
  }
  // Extract
  const awaitedPools = await Promise.all(poolsQueue);

  // Transform
  awaitedPools.map((pool) => {
    pool.pools.map((data: any) => {
      pools.push({
        ...data,
        category: categories[Math.floor(Math.random() * categories.length)],
        token: [{ ...data.token0 }, { ...data.token1 }],
      });
    });
  });

  // Load
  await index.addDocuments(pools);
  console.log('Done pushing pools');
};
