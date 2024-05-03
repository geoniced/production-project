import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Page } from '@/widgets/Page';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import { ArticleDetails } from '@/entities/Article';
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  ReducersMap,
  useDynamicModuleLoader,
} from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { Card } from '@/shared/ui/deprecated/Card';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { articleDetailsPageReducer } from '../../model/slices';
import { AdditionalInfoContainer } from '../AdditionalInfoContainer/AdditionalInfoContainer';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader';
import { DetailsContainer } from '../DetailsContainer/DetailsContainer';
import cls from './ArticleDetailsPage.module.scss';

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

  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation('article-details');

  if (!id) {
    return (
      <div className={classNames(cls.articleDetailsPage, {}, [className])}>
        {t('The article was not found')}
      </div>
    );
  }

  // if (!id) {
  //   return null;
  // }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <StickyContentLayout
          content={
            <Page
              className={classNames(cls.articleDetailsPage, {}, [className])}
            >
              <VStack gap="16" max>
                <DetailsContainer />
                <ArticleRating articleId={id} />

                <ArticleRecommendationsList />
                <ArticleDetailsComments id={id!} />
              </VStack>
            </Page>
          }
          right={<AdditionalInfoContainer />}
        />
      }
      off={
        <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
          <VStack gap="16" max>
            <ArticleDetailsPageHeader />
            <ArticleDetails className={cls.articleDetails} id={id!} />
            <Card>{t('Article rating is coming soon!')}</Card>
            <ArticleRecommendationsList />
            <ArticleDetailsComments id={id!} />
          </VStack>
        </Page>
      }
    />
  );
};

export default memo(ArticleDetailsPage);
