import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import {
  LOCAL_STORAGE_LAST_DESIGN_KEY,
  USER_LOCAL_STORAGE_KEY,
} from '@/shared/const/localStorage';

import { getUseDataByIdQuery } from '../../api/userApi';
import { User } from '../types/user';

export const initAuthData = createAsyncThunk<User, void, ThunkConfig<string>>(
  'user/initAuthData',
  async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    const userId = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

    if (!userId) {
      return rejectWithValue('');
    }

    try {
      const response = await dispatch(getUseDataByIdQuery(userId)).unwrap();

      localStorage.setItem(
        LOCAL_STORAGE_LAST_DESIGN_KEY,
        response?.features?.isAppRedesigned ? 'new' : 'old',
      );

      return response;
    } catch (err) {
      return rejectWithValue('error');
    }
  },
);
