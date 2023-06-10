import { createApi } from '@reduxjs/toolkit/dist/query/react';
import {
  createEntityAdapter,
  createSelector,
  EntityId,
  EntityState,
} from '@reduxjs/toolkit';

import baseQuery from '../baseQuery';
import WebSocketManager, {
  EventCallback,
  UpdateEvent,
} from '../WebsocketManager';

const dailyPricesAdapter = createEntityAdapter<{
  symbol: EntityId;
  priceChangePercent: string;
  lastPrice: string;
}>({ selectId: ({ symbol }) => symbol });

interface UpdateDailyPriceEvent extends UpdateEvent {
  P: string;
  c: string;
}
const convertDailyPriceUpdateMessageToEntity = ({
  s,
  P,
  c,
}: UpdateDailyPriceEvent) => ({
  symbol: s,
  priceChangePercent: P,
  lastPrice: c,
});

const pricesApiSlice = createApi({
  baseQuery,
  reducerPath: 'prices',
  tagTypes: ['list'],
  endpoints: (builder) => ({
    dailyPrices: builder.query<
      {
        daily: EntityState<{
          symbol: EntityId;
          priceChangePercent: string;
          lastPrice: string;
        }>;
      },
      void
    >({
      queryFn: () => ({
        // fetch previous data.
        data: {
          daily: dailyPricesAdapter.getInitialState(),
        },
      }),
      async onCacheEntryAdded(
        _arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
      ) {
        try {
          await cacheDataLoaded;

          const manager = WebSocketManager.getInstance();

          const handleUpdate: EventCallback<UpdateDailyPriceEvent> = (data) => {
            updateCachedData((draft) => {
              if (Array.isArray(data)) {
                dailyPricesAdapter.upsertMany(
                  draft.daily,
                  data.map(convertDailyPriceUpdateMessageToEntity),
                );
              } else {
                dailyPricesAdapter.upsertOne(
                  draft.daily,
                  convertDailyPriceUpdateMessageToEntity(data),
                );
              }
            });
          };

          await manager.connect();
          await manager.subscribe('!ticker@arr', handleUpdate);

          await cacheEntryRemoved;
          await manager.unsubscribe('!ticker@arr');
          manager.close();
        } catch (error) {
          console.log('unexpected error: ', error);
        }
      },
    }),
  }),
});

export default pricesApiSlice;

export const { useDailyPricesQuery } = pricesApiSlice;

const priceSelectors = dailyPricesAdapter.getSelectors();
const selectPricesData = pricesApiSlice.endpoints.dailyPrices.select();

export const selectPriceBySymbol = (symbol: EntityId) =>
  createSelector(selectPricesData, ({ data, isSuccess }) => {
    if (!isSuccess || !data?.daily) return undefined;
    return priceSelectors.selectById(data.daily, symbol);
  });

export const selectAllPrices = createSelector(
  selectPricesData,
  ({ data, isSuccess }) => {
    if (!isSuccess || !data?.daily) return undefined;
    return priceSelectors.selectAll(data.daily);
  },
);

export const selectAllSymbols = createSelector(
  selectPricesData,
  ({ data, isSuccess }) => {
    if (!isSuccess || !data?.daily) return undefined;
    return priceSelectors.selectIds(data.daily);
  },
);
