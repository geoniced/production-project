import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { ArticleSortSelect } from "@/features/ArticleSortSelect";
import { ArticleTypeTabs } from "@/features/ArticleTypeTabs";
import { ArticleViewSelector } from "@/features/ArticleViewSelector";
import { ArticleSortField, ArticleView, ArticleType } from "@/entities/Article";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useDebounce } from "@/shared/lib/hooks/useDebounce/useDebounce";
import { SortOrder } from "@/shared/types";
import { Card } from "@/shared/ui/Card";
import { Input } from "@/shared/ui/Input";

import {
  getArticlesPageOrder,
  getArticlesPageSearch,
  getArticlesPageSort,
  getArticlesPageType,
  getArticlesPageView,
} from "../../model/selectors/articlesPageSelectors";
import { fetchArticlesList } from "../../model/services/fetchArticlesList/fetchArticlesList";
import { articlesPageActions } from "../../model/slice/articlesPage";
import cls from "./ArticlesPageFilters.module.scss";

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
