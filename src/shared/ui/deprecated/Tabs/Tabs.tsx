import { ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { TestProps } from '@/shared/types/tests';

import { typedMemo } from '../../redesigned/TypedMemo/TypedMemo';
import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabItem<T extends string> {
  value: T;
  content: ReactNode;
}

interface TabsProps<T extends string> extends TestProps {
  className?: string;
  tabs: TabItem<T>[];
  value: T;
  onTabClick: (tab: TabItem<T>) => void;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Tabs = typedMemo(function Tabs<T extends string>(
  props: TabsProps<T>,
) {
  const { className, tabs, value, onTabClick } = props;

  const { t } = useTranslation();

  const clickHandler = useCallback(
    (tab: TabItem<T>) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <div className={classNames(cls.tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          className={cls.tab}
          key={tab.value}
          onClick={clickHandler(tab)}
          data-testid={`${props['data-testid']}.${tab.value}`}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});
