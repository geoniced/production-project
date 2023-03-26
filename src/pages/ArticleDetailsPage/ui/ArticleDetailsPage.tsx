import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleDetails } from 'entities/Article';
import { useNavigate, useParams } from 'react-router-dom';
import { CommentList } from 'entities/Comment';
import { ReducersMap, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { useSelector } from 'react-redux';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AddCommentForm } from 'features/AddCommentForm';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'shared/ui/Page/Page';
import { fetchCommentsByArticleId } from '../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleDetailsCommentsIsLoading } from '../model/selectors/comments';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsCommentsReducer, getArticleComments } from '../model/slice/articleDetailsCommentsSlice';
import { addCommentForArticle } from '../model/services/addCommentForArticle/addCommentForArticle';

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

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { id } = useParams<{id: string}>();
  const { t } = useTranslation('article-details');
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);
  // const commentsError = useSelector(getArticleDetailsCommentsError);

  const onBackToArticlesListClick = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
  });

  const onSendComment = useCallback((text: string) => {
    dispatch(addCommentForArticle(text));
  }, [dispatch]);

  if (!id) {
    return (
      <div className={classNames(cls.articleDetailsPage, {}, [className])}>
        {t('The article was not found')}
      </div>
    );
  }

  return (
    <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
      <Button
        theme={ButtonTheme.OUTLINE}
        onClick={onBackToArticlesListClick}
        className={cls.backToArticleListButton}
      >
        {t('Back to articles list')}
      </Button>
      <ArticleDetails className={cls.articleDetails} id={id} />
      <Text className={cls.commentsTitle} title={t('Comments')} />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList
        isLoading={commentsIsLoading}
        comments={comments}
      />
    </Page>
  );
};

export default memo(ArticleDetailsPage);
