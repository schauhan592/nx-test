import { getHostname } from '@alfred/alfred-common';
import { API_ENDPOINTS } from '@sdf/base';
import axios from 'axios';

export interface UserTradesRequestProps {
  users: string[];
}

export default async function getUserTrades({ users }: UserTradesRequestProps) {
 
  const res = await axios({
    url: `${getHostname(API_ENDPOINTS.GMX_QUERY)}/cubejs-api/v1/load?query={
      "limit": 5000,
      "dimensions":[
        "gmx_trader_trades.account",
        "gmx_trader_trades.volume_usd",
        "gmx_trader_trades.pnl_usd",
        "gmx_trader_trades.token",
        "gmx_trader_trades.status",
        "gmx_trader_trades.position_side",
        "gmx_trader_trades.evt_block_time",
        "gmx_trader_trades.txn_hash",
        "gmx_trader_trades.collateral",
        "gmx_trader_trades.events",
        "gmx_trader_trades.leverage",
        "gmx_trader_trades.price_usd",
        "gmx_trader_trades.fee_usd",
        "gmx_trader_trades.average_price_usd"
     ],
      "order": {
        "gmx_trader_trades.evt_block_time": "desc"
      },
     "filters": [{"member": "gmx_trader_trades.account", "operator": "equals", "values": ${JSON.stringify(
       users
     )}}]}`,
    method: 'GET',
  });

  return res?.data?.data;
}
