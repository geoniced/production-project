import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getProfileForm } from 'entities/Profile';
import { Profile, ValidateProfileError } from '../../types/profile';
import { validateProfileData } from '../validateProfileData/validateProfileData';

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
  >(
    'profile/updateProfileData',
    async (_, thunkAPI) => {
      const {
        extra, dispatch, rejectWithValue, getState,
      } = thunkAPI;

      const formData = getProfileForm(getState());

      const errors = validateProfileData(formData);

      if (errors.length) {
        return rejectWithValue(errors);
      }

      try {
        const { data } = await extra.api.put<Profile>('/profile', formData);

        if (!data) {
          throw new Error();
        }

        return data;
      } catch (err) {
        return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
      }
    },
  );
