import { memo, ReactElement } from 'react';

import { FeatureFlags } from '@/shared/types/featureFlags';

import { getFeatureFlag } from '../setGetFeatures';

interface ToggleFeaturesProps {
  feature: keyof FeatureFlags;
  on: ReactElement;
  off: ReactElement;
}

export const ToggleFeatures = memo(function ToggleFeatures(
  props: ToggleFeaturesProps,
) {
  const { off, on, feature } = props;

  console.log(getFeatureFlag(feature));
  if (getFeatureFlag(feature)) {
    return on;
  }

  return off;
});
