import React, { memo } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';

import { DeprecatedNotificationButton } from '../DeprecatedNotificationButton/DeprecatedNotificationButton';
import { RedesignedNotificationButton } from '../RedesignedNotificationButton/RedesignedNotificationButton';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<RedesignedNotificationButton {...props} />}
      off={<DeprecatedNotificationButton {...props} />}
    />
  );
});
