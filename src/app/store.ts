import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistStore } from 'redux-persist';

// state slices:
import { userReducer } from '../features/user';
import pricesApiSlice from '../features/prices/pricesApiSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    [pricesApiSlice.reducerPath]: pricesApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      pricesApiSlice.middleware,
    ),
});
setupListeners(store.dispatch);

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
