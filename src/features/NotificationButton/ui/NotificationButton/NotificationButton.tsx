import { classNames } from "shared/lib/classNames/classNames";
import React, { memo, useCallback, useState } from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Icon } from "shared/ui/Icon/Icon";
import NotificationIcon from "shared/assets/icons/notification-20-20.svg";
import { NotificationList } from "entities/Notification";
import { Popover } from "shared/ui/Popups";
import { Drawer } from "shared/ui/Drawer/Drawer";
import { BrowserView, MobileView } from "react-device-detect";
import cls from "./NotificationButton.module.scss";

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onDrawerOpen = useCallback(() => setIsOpen(true), []);
  const onDrawerClose = useCallback(() => setIsOpen(false), []);

  const trigger = (
    <Button
      onClick={onDrawerOpen}
      className={cls.triggerButton}
      theme={ButtonTheme.CLEAR}
    >
      <Icon Svg={NotificationIcon} inverted />
    </Button>
  );

  return (
    <div>
      <BrowserView>
        <Popover
          className={classNames(cls.notificationButton, {}, [className])}
          trigger={trigger}
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      </BrowserView>

      <MobileView>
        {trigger}
        <Drawer onClose={onDrawerClose} isOpen={isOpen}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  );
});
