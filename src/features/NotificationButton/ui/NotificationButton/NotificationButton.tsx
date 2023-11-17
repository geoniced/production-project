import React, { memo, useCallback, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Icon } from "@/shared/ui/Icon";
import NotificationIcon from "@/shared/assets/icons/notification-20-20.svg";
import { NotificationList } from "@/entities/Notification";
import { Popover } from "@/shared/ui/Popups";
import { Drawer } from "@/shared/ui/Drawer";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile/useIsMobile";
import cls from "./NotificationButton.module.scss";

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;

  const isMobile = useIsMobile();

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
});
