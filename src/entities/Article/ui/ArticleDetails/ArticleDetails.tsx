import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { ReducersMap, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { memo, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import EyeIcon from 'shared/assets/icons/eye-20-20.svg';
import CalendarIcon from 'shared/assets/icons/calendar-20-20.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleCodeBlockComponent } from 'entities/Article/ui/ArticleCodeBlockComponent/ArticleCodeBlockComponent';
import { ArticleImageBlockComponent } from 'entities/Article/ui/ArticleImageBlockComponent/ArticleImageBlockComponent';
import { ArticleTextBlockComponent } from 'entities/Article/ui/ArticleTextBlockComponent/ArticleTextBlockComponent';
import { ArticleBlock, ArticleBlockType } from '../../model/types/article';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';

interface ArticleDetailsProps {
  className?: string;
  id: string;
}
const initialReducers: ReducersMap = {
  articleDetails: articleDetailsReducer,
};

const dynamicModuleLoaderProps = {
  reducers: initialReducers,
  removeAfterUnmount: true,
};

const renderBlock = (block: ArticleBlock) => {
  switch (block.type) {
    case ArticleBlockType.CODE:
      return <ArticleCodeBlockComponent key={block.id} block={block} className={cls.block} />;
    case ArticleBlockType.IMAGE:
      return <ArticleImageBlockComponent key={block.id} block={block} className={cls.block} />;
    case ArticleBlockType.TEXT:
      return <ArticleTextBlockComponent key={block.id} className={cls.block} block={block} />;
    default:
      return null;
  }
};

export const ArticleDetails = memo((props: ArticleDetailsProps) => {
  const {
    className,
    id,
  } = props;
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);
  const article = useSelector(getArticleDetailsData);

  useDynamicModuleLoader(dynamicModuleLoaderProps);

  const { t } = useTranslation('article-details');

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} width={200} height={200} borderRadius="100%" />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </>
    );
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        text={t('An error happened loading the article')}
      />
    );
  } else {
    content = (
      <>
        <div className={cls.avatarWrapper}>
          <Avatar size={200} src={article?.img} className={cls.avatar} />
        </div>
        <Text
          className={cls.title}
          title={article?.title}
          text={article?.subtitle}
          size={TextSize.L}
        />
        <div className={cls.articleInfo}>
          <Icon Svg={EyeIcon} className={cls.icon} />
          <Text text={String(article?.views)} />
        </div>

        <div className={cls.articleInfo}>
          <Icon Svg={CalendarIcon} className={cls.icon} />
          <Text text={article?.createdAt} />
        </div>

        {article?.blocks.map(renderBlock)}
      </>
    );
  }

  return (
    <div className={classNames(cls.articleDetails, {}, [className])}>
      {content}
    </div>
  );
});
