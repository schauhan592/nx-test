import { getHostname } from '@alfred/alfred-common';
import { API_ENDPOINTS } from '@sdf/base';
import axios from 'axios';

export interface GetTotalGavRequestPayload {
  users: string[];
}

export default async function getTotalGav({ users }: GetTotalGavRequestPayload) {
 
  const res = await axios({
    url: `${getHostname(API_ENDPOINTS.GMX_QUERY)}/cubejs-api/v1/load?query={
        "dimensions": [
          "gmx_trader_gav.account",
          "gmx_trader_gav.total_gav"
        ],
      "filters": [{"member": "gmx_trader_gav.account", "operator": "equals", "values": ${JSON.stringify(
      users
    )}}]}`,
    method: 'GET',
  });

  return res?.data?.data[0]?.['gmx_trader_gav.total_gav'] || 0;
}
