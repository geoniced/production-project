import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useSelector } from "react-redux";
import { ArticleList } from "entities/Article";
import { Text } from "shared/ui/Text/Text";
import { getArticles } from "../../model/slice/articlesPage";
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";

interface ArticleInfiniteListProps {
  className?: string;
}

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const { className } = props;

  const { t } = useTranslation("article");
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);

  if (error) {
    return <Text text={t("Error while loading articles")} />;
  }

  return (
    <ArticleList
      className={className}
      isLoading={isLoading}
      view={view}
      articles={articles}
    />
  );
});
