import { ReactNode, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { TestProps } from '@/shared/types/tests';

import { typedMemo } from '../../redesigned/TypedMemo/TypedMemo';
import { Card } from '../Card/Card';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';
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
  direction?: FlexDirection;
}

export const Tabs = typedMemo(function Tabs<T extends string>(
  props: TabsProps<T>,
) {
  const { className, tabs, value, onTabClick, direction = 'row' } = props;

  const { t } = useTranslation();

  const clickHandler = useCallback(
    (tab: TabItem<T>) => () => {
      onTabClick(tab);
    },
    [onTabClick],
  );

  return (
    <Flex
      direction={direction}
      gap="8"
      align="start"
      className={classNames(cls.tabs, {}, [className])}
    >
      {tabs.map((tab) => {
        const isSelected = tab.value === value;

        return (
          <Card
            variant={tab.value === value ? 'light' : 'normal'}
            className={classNames(cls.tab, { [cls.selected]: isSelected })}
            key={tab.value}
            onClick={clickHandler(tab)}
            data-testid={`${props['data-testid']}.${tab.value}`}
            border="round"
          >
            {tab.content}
          </Card>
        );
      })}
    </Flex>
  );
});
