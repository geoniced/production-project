import { memo } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';

import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';
import { ArticleListItemProps } from '../../model/types/articleItem';

export const ArticleListItem = memo(function ArticleListItem(
  props: ArticleListItemProps,
) {
  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<ArticleListItemRedesigned {...props} />}
      off={<ArticleListItemDeprecated {...props} />}
    />
  );
});
