import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Icon } from 'shared/ui/Icon/Icon';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import {
  Article, ArticleBlockType, ArticleTextBlock, ArticleView,
} from '../../model/types/article';
import cls from './ArticleListItem.module.scss';
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

interface ArticleListItemProps {
  className?: string;
  article: Article;
  view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => {
  const {
    className,
    article,
    view,
  } = props;

  const { t } = useTranslation();
  const navigate = useNavigate();

  const onArticleClick = useCallback(() => {
    navigate(RoutePath.article_details + article.id);
  }, [article.id, navigate]);

  const types = <Text className={cls.types} text={article.type.join(', ')} />;
  const views = (
    <>
      <Text className={cls.views} text={String(article.views)} />
      <Icon className={cls.viewsIcon} Svg={EyeIcon} />
    </>
  );

  if (view === ArticleView.LIST) {
    const textBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;
    return (
      <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <Avatar size={30} src={article.user.avatar} />
            <Text className={cls.username} text={article.user.username} />
            <Text className={cls.date} text={article.createdAt} />
          </div>

          <Text className={cls.title} title={article.title} />

          {types}

          <img className={cls.img} src={article.img} alt={article.title} width="400" height="200" />

          {textBlock && (
            <ArticleTextBlockComponent
              className={cls.textBlock}
              block={textBlock}
            />
          )}

          <div className={cls.footer}>
            <Button onClick={onArticleClick} theme={ButtonTheme.OUTLINE}>
              {t('Read more')}
            </Button>

            {views}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
      <Card onClick={onArticleClick}>
        <div className={cls.imageWrapper}>
          <img className={cls.img} src={article.img} alt={article.title} width={200} height={200} />
          <Text className={cls.date} text={article.createdAt} />
        </div>

        <div className={cls.infoWrapper}>
          {types}
          {views}
        </div>

        <Text className={cls.title} text={article.title} />
      </Card>
    </div>
  );
});