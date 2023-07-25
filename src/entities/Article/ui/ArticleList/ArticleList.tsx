import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { HTMLAttributeAnchorTarget, memo } from "react";
import { Text, TextSize } from "shared/ui/Text/Text";
import { HStack } from "shared/ui/Stack";
import { VirtualizedArticleList } from "../VirtualizedArticleList/VirtualizedArticleList";
import cls from "./ArticleList.module.scss";
import {
  Article,
  ArticleView,
  VirtualizedParameters,
} from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  virtualizedParameters?: VirtualizedParameters;
  onNextPartLoad?: () => void;
}

export const ArticleList = memo((props: ArticleListProps) => {
  const {
    className,
    articles,
    isLoading,
    view = ArticleView.TILE,
    target,
    virtualizedParameters,
    onNextPartLoad,
  } = props;

  const { t } = useTranslation();

  const isList = view === ArticleView.LIST;

  const itemsPerRow = isList ? 1 : 3;
  const rowCount = isList
    ? articles.length
    : Math.ceil(articles.length / itemsPerRow);

  const renderArticle = (index: number, article: Article) => (
    <ArticleListItem
      className={cls.articleItem}
      target={target}
      key={article.id}
      article={article}
      view={view}
      index={index}
    />
  );

  if (!isLoading && articles.length === 0) {
    return (
      <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
        <Text title={t("Articles not found")} size={TextSize.L} />
      </div>
    );
  }

  return (
    <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
      {virtualizedParameters ? (
        <VirtualizedArticleList
          renderArticle={renderArticle}
          articles={articles}
          view={view}
          onNextPartLoad={onNextPartLoad}
          virtualizedParameters={virtualizedParameters}
        />
      ) : (
        <HStack gap="16">
          {articles.map((item) => (
            <ArticleListItem
              className={cls.card}
              target={target}
              article={item}
              view={view}
              key={item.id}
            />
          ))}
        </HStack>
      )}
    </div>
  );
});
