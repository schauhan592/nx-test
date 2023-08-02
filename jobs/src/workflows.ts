import { proxyActivities } from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

const { getPoolsActivity } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export async function getPoolsWorkflow(): Promise<void> {
  await getPoolsActivity();
}
