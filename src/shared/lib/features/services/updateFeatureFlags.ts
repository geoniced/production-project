import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import {
  UpdateFeatureFlagsArg,
  updateFeatureFlagsMutation,
} from '../api/featureFlagsApi';
import { getAllFeatureFlags, setFeatureFlags } from '../lib/setGetFeatures';

export const updateFeatureFlag = createAsyncThunk<
  void,
  UpdateFeatureFlagsArg,
  ThunkConfig<string>
>('features/updateFeatureFlag', async ({ userId, features }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;

  const newFeatures = {
    ...getAllFeatureFlags(),
    ...features,
  };

  try {
    await dispatch(
      updateFeatureFlagsMutation({
        userId,
        features: newFeatures,
      }),
    );

    setFeatureFlags(newFeatures);
    window.location.reload();
    return undefined;
  } catch (err) {
    return rejectWithValue('error');
  }
});
