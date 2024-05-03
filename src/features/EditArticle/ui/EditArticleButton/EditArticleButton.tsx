import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getArticleDetailsData } from '@/entities/Article';
import { getRouteEditArticle } from '@/shared/const/router';
import { ToggleFeatures } from '@/shared/lib/features';
import { AppLink as DeprecatedAppLink } from '@/shared/ui/deprecated/AppLink';
import {
  Button as DeprecatedButton,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Button } from '@/shared/ui/redesigned/Button';

import { getCanEditArticle } from '../../model/selectors/editArticle';

interface EditArticleButtonProps {}

export const EditArticleButton = memo((props: EditArticleButtonProps) => {
  const canEdit = useSelector(getCanEditArticle);
  const article = useSelector(getArticleDetailsData);

  const { t } = useTranslation('article-details');

  if (!canEdit || !article?.id) return null;

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <AppLink to={getRouteEditArticle(article.id)}>
          <Button variant="outline">{t('Edit')}</Button>
        </AppLink>
      }
      off={
        <DeprecatedAppLink to={getRouteEditArticle(article.id)}>
          <DeprecatedButton theme={ButtonTheme.OUTLINE}>
            {t('Edit article')}
          </DeprecatedButton>
        </DeprecatedAppLink>
      }
    />
  );
});
