import { memo } from "react";
import { ArticleListItemSkeleton } from "../ArticleListItem/ArticleListItemSkeleton";
import { ArticleView } from "../../model/types/article";

const getSkeletons = (view: ArticleView) =>
  new Array(view === ArticleView.TILE ? 9 : 3)
    .fill("")
    .map((item, index) => <ArticleListItemSkeleton key={index} view={view} />);

type FooterProps = {
  isLoading?: boolean;
  view: ArticleView;
  className?: string;
};

export const ArticleFooter = memo(
  ({ isLoading, view, className }: FooterProps) => {
    if (isLoading) {
      return <div className={className}>{getSkeletons(view)}</div>;
    }

    return null;
  }
);

export const createFooterComponent = (
  view: FooterProps["view"],
  isLoading?: FooterProps["isLoading"],
  className?: string
) => {
  return () => (
    <ArticleFooter className={className} isLoading={isLoading} view={view} />
  );
};
