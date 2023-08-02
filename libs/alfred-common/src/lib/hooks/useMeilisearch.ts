import { Index, SearchResponse } from 'meilisearch';
import { useEffect, useState } from 'react';
import { Pool, Strategy } from '../@types';
import meiliSearchClient from '../utils/createMeilisearchClient';

export type MeiliIndex = 'POOLS_1' | 'strategies_1' | 'POOLS_137' | 'strategies';

type Props = {
  index: MeiliIndex;
  searchWord: string;
  attributesToRetrieve?: string[];
};

export default function useMeiliSearch({ index, searchWord, attributesToRetrieve = [] }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [records, setRecords] = useState<Strategy[] | Pool[]>([]);
  const [searchResponse, setSearchResponse] = useState<SearchResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function searchWithMeili() {
    if (meiliSearchClient) {
      const searchIndex: Index<MeiliIndex> = meiliSearchClient.index(index);

      setLoading(true);
      try {
        const search = await searchIndex.search(searchWord, {
          ...(attributesToRetrieve &&
            attributesToRetrieve?.length !== 0 && { attributesToRetrieve }),
          limit: 1000,
        });
        setSearchResponse(search);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setRecords(search.hits);
        setLoading(false);
      } catch (e) {
        setError(JSON.stringify(e));
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (index) searchWithMeili();
  }, [index, searchWord, window]);

  return { records, searchResponse, error, loading };
}
