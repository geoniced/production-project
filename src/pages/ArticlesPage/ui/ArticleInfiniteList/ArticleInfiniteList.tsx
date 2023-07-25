import { useTranslation } from "react-i18next";
import { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArticleList,
  ArticleView,
  createFooterComponent,
} from "entities/Article";
import { Text } from "shared/ui/Text/Text";
import { ArticleListItemSkeleton } from "entities/Article/ui/ArticleListItem/ArticleListItemSkeleton";
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { getArticles } from "../../model/slice/articlesPage";
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import cls from "./ArticleInfiniteList.module.scss";

interface ArticleInfiniteListProps {
  className?: string;
}

const createHeaderComponent = () => (
  <ArticlesPageFilters className={cls.infiniteListHeader} />
);

const ItemContainerComponent = memo(
  ({ index, view }: { index: number; view: ArticleView }) => (
    <div className={cls.itemContainer}>
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    </div>
  )
);

const createItemContainerComponent = (view: ArticleView) => {
  return ({ index }: { index: number }) => (
    <ItemContainerComponent index={index} view={view} />
  );
};

export const ArticleInfiniteList = memo((props: ArticleInfiniteListProps) => {
  const { className } = props;
  const dispatch = useDispatch();

  const { t } = useTranslation("article");
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);

  const onNextPartLoad = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  const virtualizedParameters = useMemo(() => {
    const listComponents = {
      Header: createHeaderComponent,
      Footer: createFooterComponent(view, isLoading, cls.infiniteListFooter),
    };

    const gridComponents = {
      Header: createHeaderComponent,
      ScrollSeekPlaceholder: createItemContainerComponent(view),
    };

    const scrollSeekConfiguration = {
      enter: (velocity: number) => Math.abs(velocity) > 200,
      exit: (velocity: number) => Math.abs(velocity) < 30,
    };

    return {
      list: {
        components: listComponents,
      },
      grid: {
        components: gridComponents,
        scrollSeekConfiguration,
      },
    };
  }, [isLoading, view]);

  if (error) {
    return <Text text={t("Error while loading articles")} />;
  }

  return (
    <ArticleList
      className={className}
      isLoading={isLoading}
      view={view}
      articles={articles}
      onNextPartLoad={onNextPartLoad}
      virtualizedParameters={virtualizedParameters}
    />
  );
});
