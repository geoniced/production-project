import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { VStack } from "@/shared/ui/Stack";
import { Skeleton } from "@/shared/ui/Skeleton";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import { useNotifications } from "../../api/notificationApi";
import cls from "./NotificationList.module.scss";

interface NotificationListProps {
  className?: string;
}

const NOTIFICATION_POLLING_INTERVAL = 30000;

export const NotificationList = memo((props: NotificationListProps) => {
  const { className } = props;

  const { data, isLoading } = useNotifications(null, {
    pollingInterval: NOTIFICATION_POLLING_INTERVAL,
  });

  if (isLoading) {
    return (
      <VStack
        gap="16"
        max
        className={classNames(cls.notificationList, {}, [className])}
      >
        <Skeleton width="100%" borderRadius="8px" height="80px" />
        <Skeleton width="100%" borderRadius="8px" height="80px" />
        <Skeleton width="100%" borderRadius="8px" height="80px" />
      </VStack>
    );
  }

  return (
    <VStack
      gap="16"
      max
      className={classNames(cls.notificationList, {}, [className])}
    >
      {data?.map((item) => (
        <NotificationItem key={item.id} item={item} />
      ))}
    </VStack>
  );
});
