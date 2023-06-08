import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

import { RootState } from '../../app/store';
import { isEndpointRequireApiKey } from './helpers';
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://fapi.binance.com',
  prepareHeaders: (headers, { getState, endpoint }) => {
    headers.set('accept', 'application/json');
    if (isEndpointRequireApiKey(endpoint)) {
      const { user } = getState() as RootState;
      if (user.APIKEY) {
        headers.set('X-MBX-APIKEY', `${user.APIKEY}`);
      }
    }
    return headers;
  },
});

export default baseQuery;
