import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { Text as TextDeprecated, TextSize } from '@/shared/ui/deprecated/Text';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { useArticleRecommendationsList } from '../../api/articleRecommendationsApi';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(
  function ArticleRecommendationsList(props: ArticleRecommendationsListProps) {
    const { className } = props;
    const { t } = useTranslation();

    const {
      isLoading,
      data: articles,
      error,
    } = useArticleRecommendationsList(3);

    if (isLoading || error || !articles) {
      return null;
    }

    return (
      <VStack
        data-testid="ArticleRecommendationsList"
        gap="8"
        className={classNames('', {}, [className])}
      >
        <ToggleFeatures
          feature="isAppRedesigned"
          on={<Text size="l" title={t('We also recommend')} />}
          off={
            <TextDeprecated size={TextSize.L} title={t('We also recommend')} />
          }
        />

        <ArticleList articles={articles} target="_blank" />
      </VStack>
    );
  },
);
