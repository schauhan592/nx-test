import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { checkTrait, getFilters, handleTraits } from '../filterUtils';

describe('checkTrait', () => {
  const router = {
    query: {
      traits: 'traits%5Bcolor%5D%5Bkey%5D=color&traits%5Bcolor%5D%5Bvalue%5D%5B0%5D=red',
    },
  };
  it('should return true if exists', () => {
    const response = checkTrait(router as unknown as NextRouter, 'color', 'red');
    expect(response).toEqual(true);
  });
  it('should return false if not exists', () => {
    const response: any = checkTrait(router as unknown as NextRouter, 'color', 'blue');
    expect(response).toEqual(false);
  });
});

describe('handleTraits', () => {
  it('should return if value is one', () => {
    let result = null;
    const router = {
      query: {
        traits: 'traits%5Bcolor%5D%5Bkey%5D=color&traits%5Bcolor%5D%5Bvalue%5D%5B0%5D=red',
      },
      push: () => {
        result = true;
      },
    };
    handleTraits(router as unknown as NextRouter, 'color', 'red', false);
    expect(result).toEqual(true);
  });
  it('should return if value more than one', () => {
    let result = null;
    const router = {
      query: {
        traits:
          '  traits%5Bcolor%5D%5Bkey%5D=color&traits%5Bcolor%5D%5Bvalue%5D%5B0%5D=red&traits%5Bcolor%5D%5Bvalue%5D%5B1%5D=blue',
      },
      push: () => {
        result = true;
      },
    };
    handleTraits(router as unknown as NextRouter, 'color', 'red', false);
    expect(result).toEqual(true);
  });
  it('should return if add one', () => {
    let result = null;
    const router = {
      query: {
        traits: 'traits%5Bcolor%5D%5Bkey%5D=color&traits%5Bcolor%5D%5Bvalue%5D%5B0%5D=red',
      },
      push: () => {
        result = true;
      },
    };
    handleTraits(router as unknown as NextRouter, 'color', 'red', true);
    expect(result).toEqual(true);
  });

  it('should return if add one if group not exits', () => {
    let result = null;
    const router = {
      query: {
        traits: 'traits%5Bcolor%5D%5Bkey%5D=color&traits%5Bcolor%5D%5Bvalue%5D%5B0%5D=red',
      },
      push: () => {
        result = true;
      },
    };
    handleTraits(router as unknown as NextRouter, 'boom', 'red', true);
    expect(result).toEqual(true);
  });
});

describe('getFilters', () => {
  it('should return filters for collection', () => {
    const query = {
      blockchain: 'eth',
      query: 'filter',
    };
    const result = getFilters(query as unknown as ParsedUrlQuery, 'collection');
    expect(result).toEqual({ blockchains: 'ETH', text: 'filter' });
  });
  it('should return filters for nfts', () => {
    const query = {
      Status: 'status',
      Type: 'type',
      collections: 'collection',
      traits: 'traits%5Bcolor%5D%5Bkey%5D=color&traits%5Bcolor%5D%5Bvalue%5D%5B0%5D=red',
      minPrice: 2,
      maxPrice: 4,
      currencyId: 'eth',
      lazy: true,
      NSFW: true,
      verifiedOnly: true,
      query: 'filter',
      sort: 'sort',
      blockchain: 'all',
    };
    const result = getFilters(query as unknown as ParsedUrlQuery, 'nft');
    expect(result).toEqual({
      blockchains: [],
      NSFW: true,
      collections: ['collection'],
      currencyId: 'eth',
      lazy: true,
      maxPrice: 4,
      minPrice: 2,
      searchEngine: 'filter',
      sort: 'sort',
      statuses: ['STATUS'],
      traits: [
        {
          key: 'color',
          value: ['red'],
        },
      ],
      type: ['TYPE'],
      verifiedOnly: true,
    });
  });
});
