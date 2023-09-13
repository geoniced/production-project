import { useTranslation } from "react-i18next";
import { memo, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import {
  ArticleSortField,
  ArticleSortSelect,
  ArticleView,
  ArticleViewSelector,
  ArticleType,
  ArticleTypeTabs,
} from "@/entities/Article";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Card } from "@/shared/ui/Card/Card";
import { Input } from "@/shared/ui/Input/Input";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";
import { SortOrder } from "@/shared/types";
import { TabItem, Tabs } from "@/shared/ui/Tabs/Tabs";
import { articlesPageActions } from "../../model/slice/articlesPage";
import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import cls from "./ArticlesPageFilters.module.scss";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";

interface ArticlesPageFiltersProps {
  className?: string;
}

const DELAY_MS = 500;

export const ArticlesPageFilters = memo(function ArticlesPageFilters(
  props: ArticlesPageFiltersProps
) {
  const { className } = props;
  const dispatch = useAppDispatch();

  const view = useSelector(getArticlesPageView);
  const sort = useSelector(getArticlesPageSort);
  const order = useSelector(getArticlesPageOrder);
  const search = useSelector(getArticlesPageSearch);
  const type = useSelector(getArticlesPageType);

  const { t } = useTranslation("articles");

  const fetchData = useCallback(() => {
    dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);

  const debouncedFetchData = useDebounce(fetchData, DELAY_MS);

  const onChangeViewClick = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch]
  );

  const onChangeSortClick = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData]
  );

  const onChangeOrderClick = useCallback(
    (sortOrder: SortOrder) => {
      dispatch(articlesPageActions.setOrder(sortOrder));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData]
  );

  const onSearchChange = useCallback(
    (search: string) => {
      dispatch(articlesPageActions.setSearch(search));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData]
  );

  const onTypeChange = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData]
  );

  return (
    <div className={classNames(cls.articlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelect
          sort={sort}
          order={order}
          onOrderChange={onChangeOrderClick}
          onSortChange={onChangeSortClick}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeViewClick} />
      </div>
      <Card className={cls.search}>
        <Input
          onChange={onSearchChange}
          value={search}
          placeholder={t("Search")}
        />
      </Card>
      <ArticleTypeTabs
        className={cls.tabs}
        value={type}
        onTypeChange={onTypeChange}
      />
    </div>
  );
});
