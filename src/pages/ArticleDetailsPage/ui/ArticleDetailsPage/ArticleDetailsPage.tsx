import { classNames } from "shared/lib/classNames/classNames";
import { Text, TextSize } from "shared/ui/Text/Text";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { ArticleDetails, ArticleList } from "entities/Article";
import { useNavigate, useParams } from "react-router-dom";
import { CommentList } from "entities/Comment";
import { ReducersMap, useDynamicModuleLoader } from "shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { useSelector } from "react-redux";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { AddCommentForm } from "features/AddCommentForm";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Page } from "widgets/Page/Page";
import { ArticleDetailsPageHeader } from "../ArticleDetailsPageHeader/ArticleDetailsPageHeader";
import { articleDetailsPageReducer } from "../../model/slices";
import { fetchArticleRecommendation } from "../../model/services/fetchArticleRecommendations/fetchArticleRecommendations";
import { getArticleDetailsRecommendationsIsLoading } from "../../model/selectors/recommendations";
import { getArticleRecommendations } from "../../model/slices/articleDetailsRecommendationsSlice";
import { fetchCommentsByArticleId } from "../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId";
import { getArticleDetailsCommentsIsLoading } from "../../model/selectors/comments";
import cls from "./ArticleDetailsPage.module.scss";
import { getArticleComments } from "../../model/slices/articleDetailsCommentsSlice";
import { addCommentForArticle } from "../../model/services/addCommentForArticle/addCommentForArticle";

interface ArticleDetailsPageProps {
  className?: string;
}
const initialReducers: ReducersMap = {
  articleDetailsPage: articleDetailsPageReducer,
};

const dynamicModuleLoaderProps = {
  reducers: initialReducers,
  removeAfterUnmount: true,
};

const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  useDynamicModuleLoader(dynamicModuleLoaderProps);

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation("article-details");
  const comments = useSelector(getArticleComments.selectAll);
  const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);
  // const commentsError = useSelector(getArticleDetailsCommentsError);

  const recommendations = useSelector(getArticleRecommendations.selectAll);
  const recommendationsIsLoading = useSelector(getArticleDetailsRecommendationsIsLoading);

  const onSendComment = useCallback(
    (text: string) => {
      dispatch(addCommentForArticle(text));
    },
    [dispatch]
  );

  useInitialEffect(() => {
    dispatch(fetchCommentsByArticleId(id));
    dispatch(fetchArticleRecommendation());
  });

  if (!id) {
    return <div className={classNames(cls.articleDetailsPage, {}, [className])}>{t("The article was not found")}</div>;
  }

  return (
    <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
      <ArticleDetailsPageHeader />
      <ArticleDetails className={cls.articleDetails} id={id} />
      <Text size={TextSize.L} className={cls.commentsTitle} title={t("We also recommend")} />
      <ArticleList
        className={cls.recommendations}
        articles={recommendations}
        isLoading={recommendationsIsLoading}
        target="_blank"
      />
      <Text size={TextSize.L} className={cls.commentsTitle} title={t("Comments")} />
      <AddCommentForm onSendComment={onSendComment} />
      <CommentList isLoading={commentsIsLoading} comments={comments} />
    </Page>
  );
};

export default memo(ArticleDetailsPage);
