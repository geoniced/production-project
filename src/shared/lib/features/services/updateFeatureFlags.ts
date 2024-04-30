import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import {
  UpdateFeatureFlagsArg,
  updateFeatureFlagsMutation,
} from '../api/featureFlagsApi';
import { getAllFeatureFlags } from '../lib/setGetFeatures';

export const updateFeatureFlag = createAsyncThunk<
  void,
  UpdateFeatureFlagsArg,
  ThunkConfig<string>
>('user/updateFeatureFlag', async ({ userId, features }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  try {
    await dispatch(
      updateFeatureFlagsMutation({
        userId,
        features: {
          ...getAllFeatureFlags(),
          ...features,
        },
      }),
    );

    window.location.reload();
    return undefined;
  } catch (err) {
    return rejectWithValue('error');
  }
});
