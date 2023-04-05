import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import {
  DynamicModuleLoaderProps,
  ReducersMap,
  useDynamicModuleLoader,
} from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Page } from 'widgets/Page/Page';
import { initArticlesPage } from '../model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPage } from '../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {
  getArticlesPageError,
  getArticlesPageIsLoading,
  getArticlesPageView,
} from '../model/selectors/articlesPageSelectors';
import { articlesPageActions, articlesPageReducer, getArticles } from '../model/slice/articlesPage';
import cls from './ArticlesPage.module.scss';

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
  const {
    className,
  } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation('article');

  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getArticlesPageIsLoading);
  const error = useSelector(getArticlesPageError);
  const view = useSelector(getArticlesPageView);

  const onChangeViewClick = useCallback((view: ArticleView) => {
    dispatch(articlesPageActions.setView(view));
  }, [dispatch]);

  const onNextPartLoad = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  useDynamicModuleLoader(dynamicModuleLoaderProps);
  useInitialEffect(() => {
    dispatch(initArticlesPage());
  });

  return (
    <Page
      onScrollEnd={onNextPartLoad}
      className={classNames(cls.articlesPage, {}, [className])}
    >
      <ArticleViewSelector view={view} onViewClick={onChangeViewClick} />
      <ArticleList
        isLoading={isLoading}
        view={view}
        articles={articles}
      />
    </Page>
  );
};

export default memo(ArticlesPage);
