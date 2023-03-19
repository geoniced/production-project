import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ArticleList, ArticleView, ArticleViewSelector } from 'entities/Article';
import { ReducersMap, useDynamicModuleLoader } from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { fetchArticlesList } from '../model/services/fetchArticlesList/fetchArticlesList';
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

const dynamicModuleLoaderProps = {
  reducers: initialReducers,
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

  useDynamicModuleLoader(dynamicModuleLoaderProps);
  useInitialEffect(() => {
    dispatch(fetchArticlesList());
    dispatch(articlesPageActions.initState());
  });

  return (
    <div className={classNames(cls.articlesPage, {}, [className])}>
      <ArticleViewSelector view={view} onViewClick={onChangeViewClick} />
      <ArticleList
        isLoading={isLoading}
        view={view}
        articles={articles}
      />
    </div>
  );
};

export default memo(ArticlesPage);
