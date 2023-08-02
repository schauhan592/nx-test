import { Index } from 'meilisearch';
import { MeiliIndex } from '../hooks/useMeilisearch';
import meiliSearchClient from '../utils/createMeilisearchClient';

export const getDataFromIds = async (index: string, ids: string[]) => {
  if (ids && meiliSearchClient) {
    try {
      const searchIndex: Index<MeiliIndex> = meiliSearchClient.index(index);
      const promises = ids.map((id) => searchIndex.getDocument(id).catch(() => undefined));
      return await Promise.all(promises);
    } catch (e) {
      return Error('Something went wrong');
    }
  }
  if (!meiliSearchClient) return Error('Meilisearch Client not initialised');
  if (!ids) return Error('Ids are required field');
};
