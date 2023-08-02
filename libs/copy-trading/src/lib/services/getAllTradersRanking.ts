import axios from 'axios';

export default async function getAllTradersRanking() {
  const res = await axios({
    url: `https://pre-production.alfred.capital/query/cubejs-api/v1/load?query={"dimensions":["gmx_top_traders_analytics.account", "gmx_top_traders_analytics.total_trades", "gmx_top_traders_analytics.one_month_trades", "gmx_top_traders_analytics.total_pnl_till_date", "gmx_top_traders_analytics.one_month_pnl_usd", "gmx_top_traders_analytics.total_volume_till_date", "gmx_top_traders_analytics.one_month_volume_usd", "gmx_top_traders_analytics.total_pnl_percentage", "gmx_top_traders_analytics.profitable_trades", "gmx_top_traders_analytics.one_month_Pnl_percentage","gmx_top_traders_analytics.winning_percentage"],"order": {"gmx_top_traders_analytics.one_month_pnl_percentage": "desc"}}`,
    method: 'GET',
  });

  return res?.data?.data;
}
