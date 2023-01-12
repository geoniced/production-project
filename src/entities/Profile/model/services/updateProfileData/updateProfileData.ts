import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from 'entities/Profile';
import { Profile } from '../../types/profile';

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<string>
  >(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
      const {
        extra, dispatch, rejectWithValue, getState,
      } = thunkAPI;

      const formData = getProfileForm(getState());

      try {
        const { data } = await extra.api.put<Profile>('/profile', formData);

        return data;
      } catch (err) {
        return rejectWithValue('error');
      }
    },
  );
