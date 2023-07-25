import { classNames } from "shared/lib/classNames/classNames";
import { memo, useCallback } from "react";
import {
  DynamicModuleLoaderProps,
  ReducersMap,
  useDynamicModuleLoader,
} from "shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect/useInitialEffect";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { Page } from "widgets/Page/Page";
import { useSearchParams } from "react-router-dom";
import { ArticleInfiniteList } from "../ArticleInfiniteList/ArticleInfiniteList";
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { articlesPageReducer } from "../../model/slice/articlesPage";
import cls from "./ArticlesPage.module.scss";

interface ArticlesPageProps {}

const initialReducers: ReducersMap = {
  articlesPage: articlesPageReducer,
};

const dynamicModuleLoaderProps: DynamicModuleLoaderProps = {
  reducers: initialReducers,
  removeAfterUnmount: false,
};

const ArticlesPage = (props: ArticlesPageProps) => {
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  useDynamicModuleLoader(dynamicModuleLoaderProps);
  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  return <ArticleInfiniteList className={cls.articlesPage} />;
};

export default memo(ArticlesPage);
