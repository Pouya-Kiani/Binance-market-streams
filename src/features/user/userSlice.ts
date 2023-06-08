import { SliceCaseReducers, createSlice } from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/es/storage/session';

import { TEST_API_KEY } from './constants';

const initialState = {
  APIKEY: undefined,
};

const userSlice = createSlice<
  { APIKEY?: string },
  SliceCaseReducers<{ APIKEY?: string }>
>({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => ({ ...state, APIKEY: TEST_API_KEY }),
    logout: () => initialState,
  },
});

const persistConfig = {
  key: 'user',
  storage,
};

export default userSlice;
export const userReducer = persistReducer(persistConfig, userSlice.reducer);

export const { login, logout } = userSlice.actions;
