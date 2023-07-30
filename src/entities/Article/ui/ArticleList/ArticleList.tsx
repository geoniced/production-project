import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { HTMLAttributeAnchorTarget, memo } from "react";
import { Text, TextSize } from "shared/ui/Text/Text";
import { List, ListRowProps, WindowScroller } from "react-virtualized";
import { PAGE_ID } from "widgets/Page/Page";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import cls from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  virtualized?: boolean;
}

const LIST_ITEM_HEIGHT = 630;
const TILE_ITEM_HEIGHT = 324;

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
    virtualized = true,
  } = props;

  const { t } = useTranslation();

  const isList = view === ArticleView.LIST;

  const itemsPerRow = isList ? 1 : 3;
  const rowCount = isList
    ? articles.length
    : Math.ceil(articles.length / itemsPerRow);

  const rowRenderer = ({ index, isScrolling, key, style }: ListRowProps) => {
    const items = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);

    for (let i = fromIndex; i < toIndex; i += 1) {
      items.push(
        <ArticleListItem
          className={cls.card}
          target={target}
          article={articles[i]}
          view={view}
          key={articles[i].id}
        />
      );
    }

    return (
      <div key={key} style={style} className={cls.row}>
        {items}
      </div>
    );
  };

  const renderArticle = (article: Article) => (
    <ArticleListItem
      className={cls.card}
      target={target}
      key={article.id}
      article={article}
      view={view}
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
    // @ts-ignore
    <WindowScroller scrollElement={document.getElementById(PAGE_ID) as Element}>
      {({
        height,
        width,
        registerChild,
        scrollTop,
        onChildScroll,
        isScrolling,
      }) => (
        <div
          // @ts-ignore
          ref={registerChild}
          className={classNames(cls.articleList, {}, [className, cls[view]])}
        >
          {virtualized ? (
            // @ts-ignore
            <List
              width={width ? width - 80 : 700}
              height={height ?? LIST_ITEM_HEIGHT}
              rowCount={rowCount}
              rowHeight={isList ? LIST_ITEM_HEIGHT : TILE_ITEM_HEIGHT}
              rowRenderer={rowRenderer}
              autoHeight
              onScroll={onChildScroll}
              isScrolling={isScrolling}
              scrollTop={scrollTop}
            />
          ) : (
            articles.map((item) => (
              <ArticleListItem
                className={cls.card}
                target={target}
                article={item}
                view={view}
                key={item.id}
              />
            ))
          )}

          {isLoading && getSkeletons(view)}
        </div>
      )}
    </WindowScroller>
  );
});
