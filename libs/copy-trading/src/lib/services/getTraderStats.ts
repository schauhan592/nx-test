import { getHostname } from '@alfred/alfred-common';
import { API_ENDPOINTS } from '@sdf/base';
import axios from 'axios';

export default async function getTraderStats(users: string[]) {

  const res = await axios({
    url: `${getHostname(
      API_ENDPOINTS.GMX_QUERY
    )}/cubejs-api/v1/load?query={"dimensions":["trade_analytics.account","trade_analytics.external_position","trade_analytics.total_volume_till_date", "trade_analytics.profitable_trades","trade_analytics.one_month_volume_usd","trade_analytics.total_pnl_till_date","trade_analytics.one_month_pnl_usd","trade_analytics.total_pnl_percentage","trade_analytics.one_month_Pnl_percentage","trade_analytics.total_trades","trade_analytics.one_month_trades","trade_analytics.winning_percentage"],"order":{"trade_analytics.account":"asc"},"filters":[{"member":"trade_analytics.external_position","operator":"equals","values":${JSON.stringify(
      users
    )}}]}`,
    method: 'GET',
  });

  return res.data?.data[0];
}
