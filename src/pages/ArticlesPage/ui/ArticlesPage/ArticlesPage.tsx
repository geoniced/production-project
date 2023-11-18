import { memo, useCallback } from "react";

import { useSearchParams } from "react-router-dom";

import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  DynamicModuleLoaderProps,
  ReducersMap,
  useDynamicModuleLoader,
} from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Page } from "@/widgets/Page";

import cls from "./ArticlesPage.module.scss";

import { fetchNextArticlesPage } from "../../model/services/fetchNextArticlesPage/fetchNextArticlesPage";
import { initArticlesPage } from "../../model/services/initArticlesPage/initArticlesPage";
import { articlesPageReducer } from "../../model/slice/articlesPage";
import { ArticleInfiniteList } from "../ArticleInfiniteList/ArticleInfiniteList";
import { ArticlesPageFilters } from "../ArticlesPageFilters/ArticlesPageFilters";


interface ArticlesPageProps {
  className?: string;
}

const initialReducers: ReducersMap = {
  articlesPage: articlesPageReducer,
};

const dynamicModuleLoaderProps: DynamicModuleLoaderProps = {
  reducers: initialReducers,
  removeAfterUnmount: false,
};

const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();

  const [searchParams] = useSearchParams();

  const onNextPartLoad = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useDynamicModuleLoader(dynamicModuleLoaderProps);
  useInitialEffect(() => {
    dispatch(initArticlesPage(searchParams));
  });

  return (
    <Page
      onScrollEnd={onNextPartLoad}
      className={classNames(cls.articlesPage, {}, [className])}
    >
      <ArticlesPageFilters />
      <ArticleInfiniteList className={cls.list} />
    </Page>
  );
};

export default memo(ArticlesPage);
