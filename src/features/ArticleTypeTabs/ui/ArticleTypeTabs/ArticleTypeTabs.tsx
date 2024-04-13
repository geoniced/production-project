import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { TabItem, Tabs as DeprecatedTabs } from '@/shared/ui/deprecated/Tabs';
import { Tabs } from '@/shared/ui/redesigned/Tabs';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onTypeChange: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo(function ArticleTypeTabs(
  props: ArticleTypeTabsProps,
) {
  const { className, value, onTypeChange } = props;

  const { t } = useTranslation();
  const typeTabs = useMemo<TabItem<ArticleType>[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t('All'),
      },
      {
        value: ArticleType.IT,
        content: t('IT'),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t('Economics'),
      },
      {
        value: ArticleType.SCIENCE,
        content: t('Science'),
      },
      {
        value: ArticleType.HEALTH,
        content: t('Health'),
      },
    ],
    [t],
  );

  const onTabClick = useCallback(
    (tab: TabItem<ArticleType>) => {
      onTypeChange(tab.value);
    },
    [onTypeChange],
  );

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <Tabs
          className={classNames('', {}, [className])}
          tabs={typeTabs}
          value={value}
          onTabClick={onTabClick}
          data-testid="ArticleTypeTabs"
          direction="column"
        />
      }
      off={
        <DeprecatedTabs
          className={classNames('', {}, [className])}
          tabs={typeTabs}
          value={value}
          onTabClick={onTabClick}
          data-testid="ArticleTypeTabs"
        />
      }
    />
  );
});
