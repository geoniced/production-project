import React, { memo, useCallback, useState } from 'react';

import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useIsMobile } from '@/shared/lib/hooks/useIsMobile/useIsMobile';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Popover } from '@/shared/ui/redesigned/Popups';

import cls from './RedesignedNotificationButton.module.scss';

interface RedesignedNotificationButtonProps {
  className?: string;
}

export const RedesignedNotificationButton = memo(
  (props: RedesignedNotificationButtonProps) => {
    const { className } = props;

    const isMobile = useIsMobile();

    const [isOpen, setIsOpen] = useState(false);

    const onDrawerOpen = useCallback(() => setIsOpen(true), []);
    const onDrawerClose = useCallback(() => setIsOpen(false), []);

    const trigger = (
      <Icon Svg={NotificationIcon} clickable onClick={onDrawerOpen} />
    );

    if (isMobile) {
      return (
        <div>
          {trigger}

          <Drawer onClose={onDrawerClose} isOpen={isOpen}>
            <NotificationList />
          </Drawer>
        </div>
      );
    }

    return (
      <Popover
        className={classNames(cls.notificationButton, {}, [className])}
        trigger={trigger}
      >
        <NotificationList className={cls.notifications} />
      </Popover>
    );
  },
);
