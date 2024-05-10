import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  LOCAL_STORAGE_LAST_DESIGN_KEY,
  USER_LOCAL_STORAGE_KEY,
} from '@/shared/const/localStorage';
import { setFeatureFlags } from '@/shared/lib/features';

import { initAuthData } from '../services/initAuthData';
import { saveJsonSettings } from '../services/saveJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
  _initialized: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthData: (state, { payload }: PayloadAction<User>) => {
      state.authData = payload;
      setFeatureFlags(payload.features);

      // better to set items to LS while in loginByUserName async thunk
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, payload.id);
      localStorage.setItem(
        LOCAL_STORAGE_LAST_DESIGN_KEY,
        payload?.features?.isAppRedesigned ? 'new' : 'old',
      );
    },
    // initAuthData: (state) => {
    //   const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    //
    //   if (user) {
    //     const jsonUser = JSON.parse(user) as User;
    //     state.authData = jsonUser;
    //
    //     setFeatureFlags(jsonUser.features);
    //   }
    //
    //   state._initialized = true;
    // },
    logout: (state) => {
      state.authData = undefined;
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      saveJsonSettings.fulfilled,
      (state, { payload }: PayloadAction<JsonSettings>) => {
        if (state.authData) {
          state.authData.jsonSettings = payload;
        }
      },
    );
    builder.addCase(
      initAuthData.fulfilled,
      (state, { payload }: PayloadAction<User>) => {
        state.authData = payload;

        setFeatureFlags(payload.features);
        state._initialized = true;
      },
    );
    builder.addCase(initAuthData.rejected, (state) => {
      state._initialized = true;
    });
  },
});

// Action creators are generated for each case reducer function
export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
