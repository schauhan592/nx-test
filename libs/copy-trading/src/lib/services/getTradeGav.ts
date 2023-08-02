import { getHostname } from '@alfred/alfred-common';
import { API_ENDPOINTS } from '@sdf/base';
import axios from 'axios';

export interface GetTotalGavRequestPayload {
  users: string[];
  isMounted: boolean
}

export default async function getTradeGav({ users }: GetTotalGavRequestPayload) {

  const res = await axios({
    url: `${getHostname(API_ENDPOINTS.GMX_QUERY)}/cubejs-api/v1/load?query={
        "dimensions": [
          "trade_gav.account",
          "trade_gav.total_gav",
          "trade_gav.external_position"
        ],
      "filters": [{"member": "trade_gav.external_position", "operator": "equals", "values": ${JSON.stringify(
      users
    )}}]}`,
    method: 'GET',
  });

  return res?.data?.data[0]?.['trade_gav.total_gav'] || 0;
}
