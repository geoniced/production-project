import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';

interface LoginByUsernameProps {
  username: string;
  password: string;
}

enum LoginError {
  INCORRECT_DATA = '',
  SERVER_ERROR = '',
}

export const loginByUsername = createAsyncThunk<
  User,
  LoginByUsernameProps,
  ThunkConfig<string>
>('login/loginByUsername', async (authData, thunkAPI) => {
  const { extra, dispatch, rejectWithValue } = thunkAPI;

  try {
    const { data } = await extra.api.post<User>('/login', authData);

    if (!data) {
      throw new Error();
    }

    dispatch(userActions.setAuthData(data));

    return data;
  } catch (err) {
    return rejectWithValue('error');
  }
});
