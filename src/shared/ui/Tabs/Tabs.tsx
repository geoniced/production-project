import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, ReactNode, useCallback } from "react";
import { Card, CardTheme } from "../Card/Card";
import { typedMemo } from "../TypedMemo/TypedMemo";
import cls from "./Tabs.module.scss";

export interface TabItem<T extends string> {
  value: T;
  content: ReactNode;
}

interface TabsProps<T extends string> {
  className?: string;
  tabs: TabItem<T>[];
  value: T;
  onTabClick: (tab: TabItem<T>) => void;
}

export const Tabs = typedMemo(<T extends string>(props: TabsProps<T>) => {
  const { className, tabs, value, onTabClick } = props;

  const { t } = useTranslation();

  const clickHandler = useCallback(
    (tab: TabItem<T>) => () => {
      onTabClick(tab);
    },
    [onTabClick]
  );

  return (
    <div className={classNames(cls.tabs, {}, [className])}>
      {tabs.map((tab) => (
        <Card
          theme={tab.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
          className={cls.tab}
          key={tab.value}
          onClick={clickHandler(tab)}
        >
          {tab.content}
        </Card>
      ))}
    </div>
  );
});
