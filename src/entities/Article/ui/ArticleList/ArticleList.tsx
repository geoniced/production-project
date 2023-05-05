import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { FC, HTMLAttributeAnchorTarget, memo, useEffect, useMemo, useRef, useState } from "react";
import { ArticleListItemSkeleton } from "entities/Article/ui/ArticleListItem/ArticleListItemSkeleton";
import { Text, TextSize } from "shared/ui/Text/Text";
import { Virtuoso, VirtuosoGrid, VirtuosoGridHandle } from "react-virtuoso";
import { ArticlesPageFilters } from "pages/ArticlesPage/ui/ArticlesPageFilters/ArticlesPageFilters";
import { ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX } from "shared/const/localStorage";
import cls from "./ArticleList.module.scss";
import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItem } from "../ArticleListItem/ArticleListItem";

interface ArticleListProps {
  className?: string;
  articles: Article[];
  isLoading?: boolean;
  view?: ArticleView;
  target?: HTMLAttributeAnchorTarget;
  onNextPartLoad?: () => void;
}

const LIST_ITEM_HEIGHT = 630;
const TILE_ITEM_HEIGHT = 324;

const getSkeletons = (view: ArticleView) =>
  new Array(3).fill("").map((item, index) => <ArticleListItemSkeleton key={index} view={view} />);

const Header = () => <ArticlesPageFilters className={cls.header} />;
const FooterComponent = memo(({ isLoading, view }: { isLoading?: boolean; view: ArticleView }) => {
  if (isLoading) {
    return <>{getSkeletons(view)}</>;
  }

  return null;
});

export const ArticleList = memo((props: ArticleListProps) => {
  const { className, articles, isLoading, view = ArticleView.TILE, target, onNextPartLoad } = props;

  const [selectedArticleId, setSelectedArticleId] = useState(1);
  const virtuosoGridRef = useRef<VirtuosoGridHandle>(null);

  const { t } = useTranslation();

  useEffect(() => {
    const articleId = sessionStorage.getItem(ARTICLE_LIST_ITEM_LOCALSTORAGE_IDX || 1);
    setSelectedArticleId(Number(articleId));
    console.log({ articleId });
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (view === ArticleView.TILE) {
      timeout = setTimeout(() => {
        if (virtuosoGridRef.current) {
          virtuosoGridRef.current.scrollToIndex(selectedArticleId);
        }
      }, 100);
    }

    return () => clearTimeout(timeout);
  }, [selectedArticleId, view]);

  const listStyles = useMemo(() => ({ height: "100%" }), []);

  // const isList = view === ArticleView.LIST;
  // const itemsPerRow = isList ? 1 : 3;
  // const rowCount = isList ? articles.length : Math.ceil(articles.length / itemsPerRow);
  // const rowRenderer = ({ index, isScrolling, key, style }: ListRowProps) => {
  //   const items = [];
  //   const fromIndex = index * itemsPerRow;
  //   const toIndex = Math.min(fromIndex + itemsPerRow, articles.length);
  //
  //   for (let i = fromIndex; i < toIndex; i += 1) {
  //     items.push(
  //       <ArticleListItem className={cls.card} target={target} article={articles[i]} view={view} key={articles[i].id} />
  //     );
  //   }
  //
  //   return (
  //     <div key={key} style={style} className={cls.row}>
  //       {items}
  //     </div>
  //   );
  // };

  const virtuosoComponents = useMemo(
    () => ({
      Header,
      Footer: () => <FooterComponent isLoading={isLoading} view={view} />,
    }),
    [isLoading, view]
  );

  const ItemContainerComponent: FC<{ index: number }> = memo(({ index }: { index: number }) => (
    <div className={cls.itemContainer}>
      <ArticleListItemSkeleton className={cls.card} key={index} view={view} />
    </div>
  ));

  const virtuosoGridComponents = useMemo(
    () => ({
      Header,
      ScrollSeekPlaceholder: ItemContainerComponent,
    }),
    [ItemContainerComponent]
  );

  const scrollSeekConfiguration = useMemo(
    () => ({
      enter: (velocity: number) => Math.abs(velocity) > 200,
      exit: (velocity: number) => Math.abs(velocity) < 30,
    }),
    []
  );

  const renderArticle = (index: number, article: Article) => (
    <ArticleListItem
      className={cls.card}
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
      {view === ArticleView.LIST ? (
        <Virtuoso
          style={listStyles}
          data={articles}
          itemContent={renderArticle}
          endReached={onNextPartLoad}
          initialTopMostItemIndex={selectedArticleId}
          components={virtuosoComponents}
        />
      ) : (
        <VirtuosoGrid
          ref={virtuosoGridRef}
          totalCount={articles.length}
          data={articles}
          components={virtuosoGridComponents}
          endReached={onNextPartLoad}
          itemContent={renderArticle}
          listClassName={cls.itemsWrapper}
          scrollSeekConfiguration={scrollSeekConfiguration}
        />
      )}
      {/* <WindowScroller scrollElement={document.getElementById(PAGE_ID) as Element}> */}
      {/*  {({ height, width, registerChild, scrollTop, onChildScroll, isScrolling }) => ( */}
      {/*    <div ref={registerChild} className={classNames(cls.articleList, {}, [className, cls[view]])}> */}
      {/*      <List */}
      {/*        width={width ? width - 80 : 700} */}
      {/*        height={height ?? LIST_ITEM_HEIGHT} */}
      {/*        rowCount={rowCount} */}
      {/*        rowHeight={isList ? LIST_ITEM_HEIGHT : TILE_ITEM_HEIGHT} */}
      {/*        rowRenderer={rowRenderer} */}
      {/*        autoHeight */}
      {/*        onScroll={onChildScroll} */}
      {/*        isScrolling={isScrolling} */}
      {/*        scrollTop={scrollTop} */}
      {/*      /> */}
      {/*      {isLoading && getSkeletons(view)} */}
      {/*    </div> */}
      {/*  )} */}
      {/* </WindowScroller> */}
    </div>
  );
});
