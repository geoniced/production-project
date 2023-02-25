import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useParams } from 'react-router-dom';
import { CommentList } from 'entities/Comment';
import { ReducersMap, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';

import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import {
  fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getArticleDetailsCommentsIsLoading } from '../model/selectors/comments';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsCommentsReducer, getArticleComments } from '../model/slice/articleDetailsCommentsSlice';

interface ArticleDetailsPageProps {
  className?: string;
}
const initialReducers: ReducersMap = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const dynamicModuleLoaderProps = {
  reducers: initialReducers,
  removeAfterUnmount: true,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const {
    className,
  } = props;
  useDynamicModuleLoader(dynamicModuleLoaderProps);

  const dispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const { t } = useTranslation('article-details');
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);
  // const commentsError = useSelector(getArticleDetailsCommentsError);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  if (!id) {
    return (
      <div className={classNames(cls.articleDetailsPage, {}, [className])}>
        {t('The article was not found')}
      </div>
    );
  }

  return (
    <div className={classNames(cls.articleDetailsPage, {}, [className])}>
      <ArticleDetails id={id} />
      <Text className={cls.commentsTitle} title={t('Comments')} />
      <CommentList
        isLoading={commentsIsLoading}
        comments={comments}
      />
    </div>
  );
};

export default memo(ArticleDetailsPage);
