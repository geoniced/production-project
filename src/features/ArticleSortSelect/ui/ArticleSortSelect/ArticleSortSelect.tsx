import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleSortField } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/sort';
import { Select, SelectOption } from '@/shared/ui/deprecated/Select';

import cls from './ArticleSortSelect.module.scss';

interface ArticleSortSelectProps {
  className?: string;
  sort: ArticleSortField;
  order: SortOrder;
  onOrderChange: (newOrder: SortOrder) => void;
  onSortChange: (newSort: ArticleSortField) => void;
}

export const ArticleSortSelect = memo(function ArticleSortSelect(
  props: ArticleSortSelectProps,
) {
  const { className, sort, order, onOrderChange, onSortChange } = props;

  const { t } = useTranslation();

  const orderOptions = useMemo<SelectOption<SortOrder>[]>(
    () => [
      {
        value: 'asc',
        content: t('asc'),
      },
      {
        value: 'desc',
        content: t('desc'),
      },
    ],
    [t],
  );

  const sortFieldOptions = useMemo<SelectOption<ArticleSortField>[]>(
    () => [
      {
        value: ArticleSortField.CREATED_AT,
        content: t('creation date'),
      },
      {
        value: ArticleSortField.TITLE,
        content: t('title'),
      },
      {
        value: ArticleSortField.VIEWS,
        content: t('views'),
      },
    ],
    [t],
  );

  return (
    <div className={classNames(cls.articleSortSelect, {}, [className])}>
      {/* <Select<ArticleSortField> */}
      <Select
        label={t('Sort by')}
        options={sortFieldOptions}
        value={sort}
        onChange={onSortChange}
        data-testid="ArticleSortSelectType"
      />
      <Select
        label={t('by')}
        options={orderOptions}
        value={order}
        onChange={onOrderChange}
        data-testid="ArticleSortSelectBy"
      />
    </div>
  );
});
