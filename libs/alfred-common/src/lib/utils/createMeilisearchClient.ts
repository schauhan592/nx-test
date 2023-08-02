import { API_ENDPOINTS } from '@sdf/base';
import { MeiliSearch } from 'meilisearch';

export function createMeilisearchClient(): MeiliSearch | null {
  let client: MeiliSearch;
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    client = new MeiliSearch({
      host:
        process.env['NODE_ENV'] === 'production'
          ? `${window.location.origin}/${API_ENDPOINTS.SEARCH}`
          : `${process.env['NEXT_PUBLIC_HOST_API_BASE_URL']}/${API_ENDPOINTS.SEARCH}`,
      apiKey: process.env['NEXT_PUBLIC_MEILISEARCH_API_KEY'],
    });
    return client;
  } catch (e) {
    throw new Error(JSON.stringify(e));
  }
}

const meiliSearchClient = createMeilisearchClient();

export default meiliSearchClient;
