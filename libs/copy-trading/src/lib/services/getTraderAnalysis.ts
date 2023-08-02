import { getHostname } from '@alfred/alfred-common';
import { API_ENDPOINTS } from '@sdf/base';
import axios from 'axios';

export type GetTradingAnalysisPayload = {
  users: string[];
};

export default async function getTradersAnalysis({ users }: GetTradingAnalysisPayload) {
 
  const res = await axios({
    url: `${getHostname(
      API_ENDPOINTS.GMX_QUERY
    )}/cubejs-api/v1/load?query={"dimensions":["gmx_top_traders_analytics.account", "gmx_top_traders_analytics.total_trades", "gmx_top_traders_analytics.one_month_trades", "gmx_top_traders_analytics.total_pnl_till_date", "gmx_top_traders_analytics.one_month_pnl_usd","gmx_top_traders_analytics.one_month_Pnl_percentage", "gmx_top_traders_analytics.total_volume_till_date", "gmx_top_traders_analytics.one_month_volume_usd", "gmx_top_traders_analytics.total_pnl_percentage", "gmx_top_traders_analytics.profitable_trades", "gmx_top_traders_analytics.winning_percentage"], "filters": [{"member": "gmx_top_traders_analytics.account", "operator": "equals", "values": ${JSON.stringify(
      users
    )}}]}`,
    method: 'GET',
  });

  return res?.data?.data[0];
}
