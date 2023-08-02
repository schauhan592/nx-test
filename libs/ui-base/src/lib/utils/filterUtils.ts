import { NextRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import qsStringify from './stringify';
import qsParse from './qsParse';

export const checkTrait = (router: NextRouter, traitGroup: string, traitName: string) => {
  const isTraits = router.query['traits'];
  const { traits = {} } = qsParse(isTraits);
  if (traits[traitGroup]?.key === traitGroup) {
    return traits[traitGroup]?.value?.length > 0
      ? traits[traitGroup]?.value?.includes(traitName)
      : false;
  }
  return false;
};

export const handleTraits = (
  router: NextRouter,
  traitGroup: string,
  traitName: string,
  value: boolean
) => {
  const isTraits = router.query['traits'];
  const { traits = {} } = qsParse(isTraits);
  if (value) {
    if (traits[traitGroup]?.key === traitGroup) {
      traits[traitGroup].value = [...traits[traitGroup].value, traitName];
      const query = qsStringify({ traits: traits });
      router.push(
        {
          query: {
            ...router.query,
            traits: query,
          },
        },
        undefined,
        { shallow: true }
      );
      return;
    } else {
      const query = qsStringify({
        traits: { ...traits, [traitGroup]: { key: traitGroup, value: [traitName] } },
      });
      router.push(
        {
          query: {
            ...router.query,
            traits: query,
          },
        },
        undefined,
        { shallow: true }
      );
    }
    return;
  } else {
    traits[traitGroup].value = traits[traitGroup].value.filter(
      (item: string) => item !== traitName
    );
    if (traits[traitGroup].value < 1) {
      delete traits[traitGroup];
    }
    const query = qsStringify({ traits: traits });
    if (query.length === 0) {
      delete router.query['traits'];
      router.push(
        {
          query: {
            ...router.query,
          },
        },
        undefined,
        { shallow: true }
      );
      return;
    }

    router.push(
      {
        query: {
          ...router.query,
          traits: query,
        },
      },
      undefined,
      { shallow: true }
    );
  }
};

export const getFilterCount = (filter: any) => {
  let count = 0;
  if (filter?.statuses?.length > 0) {
    count += 1;
  }
  if (filter?.type?.length > 0) {
    count += 1;
  }
  if (filter?.sellPriceFrom && filter?.sellPriceTo && filter?.sellCurrency) {
    count += 1;
  }
  if (filter?.traits) {
    count += 1;
  }
  return count;
};

export const getFilters = (query: ParsedUrlQuery, from: 'collection' | 'nft') => {
  const filters: any = {};
  if (query['sort']) {
    filters.sort = query['sort'];
  }
  if (!query['blockchain']) {
    filters.blockchains = ['ETHEREUM'];
  } else {
    filters.blockchains = [`${query['blockchain']}`.toUpperCase()];
  }
  if (!(!query['Status'] || query['Status'] === 'all')) {
    filters.statuses = [`${query['Status']}`.toUpperCase()];
  }
  if (!(!query['Type'] || query['Type'] === 'all')) {
    filters.type = [`${query['Type']}`.toUpperCase()];
  }
  if (query['collections']) {
    filters.collections = [query['collections']];
  }
  if (query['traits']) {
    const isTraits = query['traits'];
    const { traits } = qsParse(isTraits);
    filters.traits = Object.values(traits);
  }

  if (query['query']) {
    filters.text = query['query'];
  }
  if (query['minPrice'] && query['maxPrice'] && query['currencyId']) {
    filters.sellPriceFrom = Number(query['minPrice']);

    filters.sellPriceTo = Number(query['maxPrice']);

    filters.sellCurrency = query['currencyId'];
  }

  if (String(query['lazy']) === 'true') filters.lazy = true;
  if (query['NSFW']) filters.NSFW = query['NSFW'];
  if (query['verifiedOnly']) filters.verifiedOnly = query['verifiedOnly'];
  if (from === 'collection') {
    const CollectionFilters: any = {};
    CollectionFilters.blockchains = [filters.blockchains[0]];
    CollectionFilters.text = filters.text;
    return CollectionFilters;
  }
  if (from === 'nft' && filters.text) {
    filters.names = [filters.text];
    delete filters.text;
    return filters;
  }

  return filters;
};
