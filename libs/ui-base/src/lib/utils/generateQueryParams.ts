export default function generateQueryParams(tokenUri: string) {
  return {
    blockchain: tokenUri?.split(':')[0],
    token: tokenUri?.split(':')[1],
    tokenId: tokenUri?.split(':')[2],
    queryString: `blockchain=${tokenUri?.split(':')[0]}&token=${tokenUri?.split(':')[1]}&tokenId=${
      tokenUri?.split(':')[2]
    }`,
  };
}
