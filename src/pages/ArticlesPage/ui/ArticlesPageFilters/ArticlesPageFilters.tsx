import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortSelect } from '@/features/ArticleSortSelect';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleViewSelector } from '@/features/ArticleViewSelector';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';

import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
  className?: string;
}

export const ArticlesPageFilters = memo(function ArticlesPageFilters(
  props: ArticlesPageFiltersProps,
) {
  const { className } = props;

  const { t } = useTranslation('articles');

  const {
    view,
    sort,
    order,
    search,
    type,
    onChangeViewClick,
    onChangeSortClick,
    onChangeOrderClick,
    onSearchChange,
    onTypeChange,
  } = useArticlesFilters();

  return (
    <div className={classNames(cls.articlesPageFilters, {}, [className])}>
      <div className={cls.sortWrapper}>
        <ArticleSortSelect
          sort={sort}
          order={order}
          onOrderChange={onChangeOrderClick}
          onSortChange={onChangeSortClick}
        />
        <ArticleViewSelector view={view} onViewClick={onChangeViewClick} />
      </div>
      <Card className={cls.search}>
        <Input
          data-testid="ArticleSearchInput"
          onChange={onSearchChange}
          value={search}
          placeholder={t('Search')}
        />
      </Card>
      <ArticleTypeTabs
        className={cls.tabs}
        value={type}
        onTypeChange={onTypeChange}
      />
    </div>
  );
});
