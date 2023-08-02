import { API_ENDPOINTS } from '@sdf/base';

export default function getHostname(endPoint: API_ENDPOINTS) {
  return process.env['NODE_ENV'] === 'production'
    ? `/${endPoint}`
    : `${process.env['NEXT_PUBLIC_HOST_API_BASE_URL']}/${endPoint}`;
}
