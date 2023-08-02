import { getHostname } from '@alfred/alfred-common';
import { API_ENDPOINTS } from '@sdf/base';
import axios from 'axios';

export default async function getUserStats(users: string[]) {

  const res = await axios({
    url: `${getHostname(
      API_ENDPOINTS.GMX_QUERY
    )}/cubejs-api/v1/load?query={"dimensions":["copy_traders_analytics.account","copy_traders_analytics.total_volume_till_date", "copy_traders_analytics.profitable_trades","copy_traders_analytics.one_month_volume_usd","copy_traders_analytics.total_pnl_till_date","copy_traders_analytics.one_month_pnl_usd","copy_traders_analytics.total_pnl_percentage","copy_traders_analytics.one_month_Pnl_percentage","copy_traders_analytics.total_trades","copy_traders_analytics.one_month_trades","copy_traders_analytics.winning_percentage"],"order":{"copy_traders_analytics.account":"asc"},"filters":[{"member":"copy_traders_analytics.account","operator":"equals","values":${JSON.stringify(
      users
    )}}]}`,
    method: 'GET',
  });

  return res.data?.data[0];
}
