import { memo, Ref, useEffect, useRef, useState } from "react";
import {
  Virtuoso,
  VirtuosoGrid,
  VirtuosoGridHandle,
  VirtuosoHandle,
} from "react-virtuoso";
import { ARTICLES_SCROLL_INDEX } from "shared/const/localStorage";
import {
  Article,
  ArticleView,
  VirtualizedParameters,
} from "../../model/types/article";
import cls from "./VirtualizedArticleList.module.scss";

interface VirtualizedArticleListProps {
  className?: string;
  articles: Article[];
  view?: ArticleView;
  onNextPartLoad?: () => void;
  renderArticle?: (index: number, article: Article) => JSX.Element;
  virtualizedParameters: VirtualizedParameters;
}

export const VirtualizedArticleList = memo(
  (props: VirtualizedArticleListProps) => {
    const {
      className,
      articles,
      view = ArticleView.TILE,
      onNextPartLoad,
      renderArticle,
      virtualizedParameters,
    } = props;

    const virtuosoRef = useRef<VirtuosoGridHandle | VirtuosoHandle>(null);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        const articleId = localStorage.getItem(ARTICLES_SCROLL_INDEX) || 0;
        if (articleId && virtuosoRef.current) {
          virtuosoRef.current.scrollToIndex({
            index: Number(articleId),
            behavior: "smooth", // Could hurt the performance, but now it looks better
          });
        }
        localStorage.setItem(ARTICLES_SCROLL_INDEX, "");
      }, 100);

      return () => {
        clearTimeout(timeoutId);
      };
    }, []);

    if (view === ArticleView.TILE) {
      return (
        <VirtuosoGrid
          ref={virtuosoRef}
          listClassName={cls.gridItemsWrapper}
          data={articles}
          totalCount={articles.length}
          itemContent={renderArticle}
          endReached={onNextPartLoad}
          components={virtualizedParameters.grid.components}
          scrollSeekConfiguration={
            virtualizedParameters.grid.scrollSeekConfiguration
          }
        />
      );
    }

    return (
      <Virtuoso
        ref={virtuosoRef as Ref<VirtuosoHandle>}
        data={articles}
        itemContent={renderArticle}
        endReached={onNextPartLoad}
        components={virtualizedParameters.list.components}
      />
    );
  }
);
