import { getHostname } from '@alfred/alfred-common';
import { API_ENDPOINTS } from '@sdf/base';
import axios from 'axios';

export interface GetGavHistoryDataRequestPayload {
  users: string[];
}

export default async function getGavHistoryData({ users }: GetGavHistoryDataRequestPayload) {
  const res = await axios({
    url: `${getHostname(API_ENDPOINTS.GMX_QUERY)}/cubejs-api/v1/load?query={
        "dimensions": [
          "gmx_trader_gav_data.time",
          "gmx_trader_gav_data.account",
          "gmx_trader_gav_data.gav"
        ],
        "order": {
          "gmx_trader_gav_data.time": "asc"
        },
        "filters": [{"member": "gmx_trader_gav_data.account", "operator": "equals", "values": ${JSON.stringify(
          users
        )}}]}`,
    method: 'GET',
  });

  return res?.data?.data;
}
