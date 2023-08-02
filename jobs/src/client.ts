import { Connection, Client } from '@temporalio/client';
import { getPoolsWorkflow } from './workflows';
import { nanoid } from 'nanoid';

// Connect to the default Server location (localhost:7233)
async function run() {
  const connection = await Connection.connect({
    address: process.env.TEMPORAL_HOST,
  });

  const client = new Client({
    connection,
  });
  const handle = await client.workflow.start(getPoolsWorkflow, {
    // type inference works! args: [name: string]
    args: [],
    taskQueue: 'jobs',
    // in practice, use a meaningful business id, eg customerId or transactionId
    workflowId: 'getPools-' + nanoid(),
    cronSchedule: '* * * * *',
  });
  console.log(`Started workflow ${handle.workflowId}`);

  // optional: wait for client result
  console.log(await handle.result()); // Hello, Temporal!
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
