import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/icons/eye.svg';
import { getRouteArticleDetails } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { getVStack, HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import {
  ArticleBlockType,
  ArticleView,
} from '../../../model/consts/articleConsts';
import { ArticleTextBlock } from '../../../model/types/article';
import { ArticleListItemProps } from '../../../model/types/articleItem';
import cls from './ArticleListItemRedesigned.module.scss';

export const ArticleListItemRedesigned = memo((props: ArticleListItemProps) => {
  const { className, article, view, target } = props;

  const { t } = useTranslation();

  const types = (
    <Text
      className={cls.types}
      text={article.type.join(', ')}
      data-testid="ArticleListItem.Types"
    />
  );
  const views = (
    <HStack gap="8">
      <Icon className={cls.viewsIcon} Svg={EyeIcon} />
      <Text className={cls.views} text={String(article.views)} />
    </HStack>
  );

  const articleLink = getRouteArticleDetails(article.id);

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;
    return (
      <Card
        max
        className={classNames(cls.articleListItem, {}, [
          className,
          cls[view],
          getVStack({ gap: '16', max: true }),
        ])}
        padding="24"
        data-testid="ArticleListItem"
      >
        <HStack gap="8">
          <Avatar size={30} src={article.user.avatar} />
          <Text bold text={article.user.username} />
          <Text text={article.createdAt} />
        </HStack>

        <Text
          bold
          title={article.title}
          tag="h2"
          data-testid="ArticleListItemTitle"
        />

        <Text
          bold
          title={article.subtitle}
          size="s"
          data-testid="ArticleListItemTitle"
        />

        <AppImage
          className={cls.img}
          src={article.img}
          alt={article.title}
          width="400"
          height="200"
          fallback={<Skeleton width="100%" height={200} />}
        />

        {textBlock?.paragraphs && (
          <Text
            className={cls.textBlock}
            text={textBlock.paragraphs.slice(0, 2).join(' ')}
          />
        )}

        <HStack max justify="between">
          <AppLink target={target} to={articleLink}>
            <Button variant="outline">{t('Read more')}</Button>
          </AppLink>

          {views}
        </HStack>
      </Card>
    );
  }

  return (
    <AppLink
      data-testid="ArticleListItem"
      target={target}
      to={articleLink}
      className={classNames(cls.articleListItem, {}, [className, cls[view]])}
    >
      <Card className={cls.tile}>
        <div className={cls.imageWrapper}>
          <AppImage
            className={cls.img}
            src={article.img}
            alt={article.title}
            width={200}
            height={200}
            fallback={<Skeleton width={200} height={200} />}
          />
          <Text className={cls.date} text={article.createdAt} />
        </div>

        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>

        <Text
          className={cls.title}
          text={article.title}
          data-testid="ArticleListItemTitle"
        />
      </Card>
    </AppLink>
  );
});
