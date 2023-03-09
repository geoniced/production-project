import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<
  Profile,
  string,
  ThunkConfig<string>
  >(
    'profile/fetchProfileData',
    async (profileId, thunkAPI) => {
      const { extra, dispatch, rejectWithValue } = thunkAPI;

      try {
        const { data } = await extra.api.get<Profile>(`/profile/${profileId}`);

        if (!data) {
          throw new Error();
        }

        return data;
      } catch (err) {
        return rejectWithValue('error');
      }
    },
  );
