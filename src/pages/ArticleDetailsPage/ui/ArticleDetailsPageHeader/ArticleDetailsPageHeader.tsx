import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { EditArticleButton } from '@/features/EditArticle';
import { getRouteArticles } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/deprecated/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/redesigned/Stack';

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(function ArticleDetailsPageHeader(
  props: ArticleDetailsPageHeaderProps,
) {
  const { className } = props;
  const { t } = useTranslation('article-details');

  return (
    <HStack justify="between" max className={classNames('', {}, [className])}>
      <AppLink to={getRouteArticles()}>
        <Button theme={ButtonTheme.OUTLINE}>
          {t('Back to articles list')}
        </Button>
      </AppLink>

      <EditArticleButton />
    </HStack>
  );
});
