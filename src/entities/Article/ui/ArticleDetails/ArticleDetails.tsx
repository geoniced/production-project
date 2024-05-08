import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  ReducersMap,
  useDynamicModuleLoader,
} from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { Text, TextAlign } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { ArticleDetailsDeprecated } from './ArticleDetailsDeprecated';
import { ArticleDetailsRedesigned } from './ArticleDetailsRedesigned';
import { ArticleDetailsSkeleton } from './ArticleDetailsSkeleton';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
  className?: string;
  id?: string;
}
const initialReducers: ReducersMap = {
  articleDetails: articleDetailsReducer,
};

const dynamicModuleLoaderProps = {
  reducers: initialReducers,
  removeAfterUnmount: true,
};

export const ArticleDetails = memo(function ArticleDetails(
  props: ArticleDetailsProps,
) {
  const { className, id } = props;
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getArticleDetailsIsLoading);
  const error = useSelector(getArticleDetailsError);
  const article = useSelector(getArticleDetailsData);

  useDynamicModuleLoader(dynamicModuleLoaderProps);

  const { t } = useTranslation('article-details');

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchArticleById(id));
    }
  }, [dispatch, id]);

  let content;

  if (isLoading) {
    content = <ArticleDetailsSkeleton />;
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        text={t('An error happened loading the article')}
      />
    );
  } else {
    content = (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={<ArticleDetailsRedesigned />}
        off={<ArticleDetailsDeprecated />}
      />
    );
  }

  return (
    <VStack
      gap="16"
      max
      className={classNames(cls.articleDetails, {}, [className])}
    >
      {content}
    </VStack>
  );
});
