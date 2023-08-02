import { getHostname } from '@alfred/alfred-common';
import { API_ENDPOINTS } from '@sdf/base';
import axios from 'axios';

export interface PnlChartRequestProps {
  users: string[];
}

export default async function getPnlChartData({ users }: PnlChartRequestProps) {
  const res = await axios({
    url: `${getHostname(
      API_ENDPOINTS.GMX_QUERY
    )}/cubejs-api/v1/load?query={"dimensions":["gmx_traders_equity.account", "gmx_traders_equity.time", "gmx_traders_equity.pnl_usd", "gmx_traders_equity.pnl_perct"], "order": { "gmx_traders_equity.time": "asc" }, "filters": [{"member": "gmx_traders_equity.account", "operator": "equals", "values": ${JSON.stringify(
      users
    )}}]}`,
    method: 'GET',
  });

  return res?.data?.data;
}
