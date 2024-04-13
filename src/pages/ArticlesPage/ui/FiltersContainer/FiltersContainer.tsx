import { memo } from 'react';

import { ArticlesFilters } from '@/widgets/ArticlesFilters';

import { useArticlesFilters } from '../../lib/hooks/useArticlesFilters';

interface FiltersContainerProps {
  className?: string;
}

export const FiltersContainer = memo((props: FiltersContainerProps) => {
  const { className } = props;

  const {
    sort,
    order,
    search,
    type,
    onChangeSortClick,
    onChangeOrderClick,
    onSearchChange,
    onTypeChange,
  } = useArticlesFilters();

  return (
    <ArticlesFilters
      search={search}
      type={type}
      sort={sort}
      order={order}
      onOrderChange={onChangeOrderClick}
      onSortChange={onChangeSortClick}
      onSearchChange={onSearchChange}
      onTypeChange={onTypeChange}
      className={className}
    />
  );
});
