import { getPools } from './jobs/fetchPools';

export async function getPoolsActivity(): Promise<void> {
  getPools();
}
