import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage';
import { setFeatureFlags } from '@/shared/lib/features';

import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
  _initialized: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
      setFeatureFlags(action.payload.features);
    },
    initAuthData: (state) => {
      const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);

      if (user) {
        const jsonUser = JSON.parse(user) as User;
        state.authData = jsonUser;

        setFeatureFlags(jsonUser.features);
      }

      state._initialized = true;
    },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
