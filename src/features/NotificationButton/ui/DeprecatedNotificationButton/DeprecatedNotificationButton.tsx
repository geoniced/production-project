import React, { memo, useCallback, useState } from 'react';

import { NotificationList } from '@/entities/Notification';
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useIsMobile } from '@/shared/lib/hooks/useIsMobile/useIsMobile';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Drawer } from '@/shared/ui/deprecated/Drawer';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/Popups';

import cls from './DeprecatedNotificationButton.module.scss';

interface NotificationButtonProps {
  className?: string;
}

export const DeprecatedNotificationButton = memo(
  (props: NotificationButtonProps) => {
    const { className } = props;

    const isMobile = useIsMobile();

    const [isOpen, setIsOpen] = useState(false);

    const onDrawerOpen = useCallback(() => setIsOpen(true), []);
    const onDrawerClose = useCallback(() => setIsOpen(false), []);

    const trigger = (
      <ButtonDeprecated
        onClick={onDrawerOpen}
        className={cls.triggerButton}
        theme={ButtonTheme.CLEAR}
      >
        <IconDeprecated Svg={NotificationIconDeprecated} inverted />
      </ButtonDeprecated>
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
      <PopoverDeprecated
        className={classNames(cls.notificationButton, {}, [className])}
        trigger={trigger}
      >
        <NotificationList className={cls.notifications} />
      </PopoverDeprecated>
    );
  },
);
