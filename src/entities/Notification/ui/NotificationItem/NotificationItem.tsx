import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Card as DeprecatedCard, CardTheme } from '@/shared/ui/deprecated/Card';
import { Text as DeprecatedText } from '@/shared/ui/deprecated/Text';
import { Card } from '@/shared/ui/redesigned/Card';
import { Text } from '@/shared/ui/redesigned/Text';

import { Notification } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, item } = props;

  const content = (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card className={classNames(cls.notificationItem, {}, [className])}>
          <Text title={item.title} text={item.description} />
        </Card>
      }
      off={
        <DeprecatedCard
          theme={CardTheme.OUTLINED}
          className={classNames(cls.notificationItem, {}, [className])}
        >
          <DeprecatedText title={item.title} text={item.description} />
        </DeprecatedCard>
      }
    />
  );

  if (item.href) {
    return (
      <a href={item.href} className={cls.link} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return content;
});
