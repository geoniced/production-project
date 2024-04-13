import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortSelect } from '@/features/ArticleSortSelect';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ArticleSortField, ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { getVStack } from '@/shared/ui/redesigned/Stack';

import cls from './ArticlesFilters.module.scss';

interface ArticlesFiltersProps {
  className?: string;
  search: string;
  onSearchChange: (search: string) => void;

  sort: ArticleSortField;
  order: SortOrder;
  onOrderChange: (newOrder: SortOrder) => void;
  onSortChange: (newSort: ArticleSortField) => void;
  type: ArticleType;
  onTypeChange: (type: ArticleType) => void;
}

export const ArticlesFilters = memo((props: ArticlesFiltersProps) => {
  const {
    className,
    sort,
    onSortChange,
    onSearchChange,
    onTypeChange,
    search,
    onOrderChange,
    order,
    type,
  } = props;

  const { t } = useTranslation();

  return (
    <Card
      className={classNames(cls.articlesFilters, {}, [
        className,
        getVStack({ gap: '32' }),
      ])}
      padding="24"
    >
      <Input
        data-testid="ArticleSearchInput"
        onChange={onSearchChange}
        value={search}
        placeholder={t('Search')}
      />

      <ArticleSortSelect
        sort={sort}
        order={order}
        onOrderChange={onOrderChange}
        onSortChange={onSortChange}
      />

      <ArticleTypeTabs
        className={cls.tabs}
        value={type}
        onTypeChange={onTypeChange}
      />
    </Card>
  );
});
