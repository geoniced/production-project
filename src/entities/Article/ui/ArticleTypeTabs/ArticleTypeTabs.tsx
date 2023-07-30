import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, useCallback, useMemo } from "react";
import { TabItem, Tabs } from "shared/ui/Tabs/Tabs";
import { articlesPageActions } from "pages/ArticlesPage/model/slice/articlesPage";
import { ArticleType } from "../../model/types/article";

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  onTypeChange: (type: ArticleType) => void;
}

export const ArticleTypeTabs = memo(function ArticleTypeTabs(
  props: ArticleTypeTabsProps
) {
  const { className, value, onTypeChange } = props;

  const { t } = useTranslation();
  const typeTabs = useMemo<TabItem<ArticleType>[]>(
    () => [
      {
        value: ArticleType.ALL,
        content: t("All"),
      },
      {
        value: ArticleType.IT,
        content: t("IT"),
      },
      {
        value: ArticleType.ECONOMICS,
        content: t("Economics"),
      },
      {
        value: ArticleType.SCIENCE,
        content: t("Science"),
      },
      {
        value: ArticleType.HEALTH,
        content: t("Health"),
      },
    ],
    [t]
  );

  const onTabClick = useCallback(
    (tab: TabItem<ArticleType>) => {
      onTypeChange(tab.value);
    },
    [onTypeChange]
  );

  return (
    <Tabs
      className={classNames("", {}, [className])}
      tabs={typeTabs}
      value={value}
      onTabClick={onTabClick}
    />
  );
});
