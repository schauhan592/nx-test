import { getHostname } from '@alfred/alfred-common';
import { API_ENDPOINTS } from '@sdf/base';
import axios from 'axios';

export interface UserGavRequestProps {
  users: string[];
}

export default async function getUserGav({ users }: UserGavRequestProps) {

  const res = await axios({
    url: `${getHostname(API_ENDPOINTS.GMX_QUERY)}/cubejs-api/v1/load?query={
        "dimensions": [
          "gmx_trader_vaults_gav.time",
          "gmx_trader_vaults_gav.account",
          "gmx_trader_vaults_gav.vault_address",
          "gmx_trader_vaults_gav.external_position",
          "gmx_trader_vaults_gav.gav"
        ],
        "order": {
          "gmx_trader_vaults_gav.time": "asc"
        },
        "filters": [
          {
            "member": "gmx_trader_vaults_gav.account",
            "operator": "equals",
            "values": 
                ${JSON.stringify(users)}
          }
        ]
      }`,
    method: 'GET',
  });

  return res?.data?.data;
}
