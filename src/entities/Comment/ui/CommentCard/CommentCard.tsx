import { memo } from 'react';

import { getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink as AppLinkDeprecated } from '@/shared/ui/deprecated/AppLink';
import { Avatar as AvatarDeprecated } from '@/shared/ui/deprecated/Avatar';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { getHStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { Comment } from '../../model/types/comment';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo(function CommentCard(props: CommentCardProps) {
  const { className, comment, isLoading } = props;

  if (isLoading) {
    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card padding="24" border="round" max>
            <VStack
              gap="8"
              max
              className={classNames(cls.commentCardRedesigned, {}, [className])}
              data-testid="CommentCard.Loading"
            >
              <div className={cls.header}>
                <SkeletonRedesigned
                  width={30}
                  height={30}
                  borderRadius="100%"
                />
                <SkeletonRedesigned
                  className={cls.username}
                  height={16}
                  width={100}
                />
              </div>

              <SkeletonRedesigned
                className={cls.text}
                width="100%"
                height={50}
              />
            </VStack>
          </Card>
        }
        off={
          <VStack
            gap="8"
            max
            className={classNames(cls.commentCard, {}, [className])}
            data-testid="CommentCard.Loading"
          >
            <div className={cls.header}>
              <SkeletonDeprecated width={30} height={30} borderRadius="100%" />
              <SkeletonDeprecated
                className={cls.username}
                height={16}
                width={100}
              />
            </div>

            <SkeletonDeprecated className={cls.text} width="100%" height={50} />
          </VStack>
        }
      />
    );
  }

  if (!comment) {
    return null;
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Card padding="24" border="round" max>
          <VStack
            gap="8"
            max
            className={classNames(cls.commentCardRedesigned, {}, [className])}
            data-testid="CommentCard.Content"
          >
            <AppLink
              to={getRouteProfile(comment.user.id)}
              className={getHStack({ gap: '8', align: 'center' })}
            >
              {comment.user.avatar && (
                <Avatar size={30} src={comment.user.avatar} />
              )}
              <Text bold text={comment.user.username} />
            </AppLink>

            <Text className={cls.text} text={comment.text} />
          </VStack>
        </Card>
      }
      off={
        <VStack
          gap="8"
          max
          className={classNames(cls.commentCard, {}, [className])}
          data-testid="CommentCard.Content"
        >
          <AppLinkDeprecated
            to={getRouteProfile(comment.user.id)}
            className={cls.header}
          >
            {comment.user.avatar && (
              <AvatarDeprecated size={30} src={comment.user.avatar} />
            )}
            <TextDeprecated
              className={cls.username}
              title={comment.user.username}
            />
          </AppLinkDeprecated>

          <TextDeprecated className={cls.text} text={comment.text} />
        </VStack>
      }
    />
  );
});
