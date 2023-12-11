import { HTMLAttributeAnchorTarget, memo } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames/classNames";
import { Text, TextSize } from "@/shared/ui/Text";

import { ArticleView } from "../../model/consts/articleConsts";
import { Article } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import cls from "./ArticleList.module.scss";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.TILE ? 9 : 3)
    .fill("")
    .map((item, index) => <ArticleListItemSkeleton key={index} view={view} />);

export const ArticleList = memo(function ArticleList(props: ArticleListProps) {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.TILE,
    target,
  } = props;

  const { t } = useTranslation();

  if (!isLoading && articles.length === 0) {
    return (
      <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
        <Text title={t("Articles not found")} size={TextSize.L} />
      </div>
    );
  }

  return (
    <div
      className={classNames(cls.articleList, {}, [className, cls[view]])}
      data-testid="ArticleList"
    >
      {articles.map((item) => (
        <ArticleListItem
          className={cls.card}
          target={target}
          article={item}
          view={view}
          key={item.id}
        />
      ))}

      {isLoading && getSkeletons(view)}
    </div>
  );
});
