import { FC, lazy, Suspense } from "react";

import { Skeleton } from "@/shared/ui/Skeleton";

import { ArticleRatingProps } from "./ArticleRating";

const ArticleRatingLazy = lazy<FC<ArticleRatingProps>>(
  () => import("./ArticleRating")
);

export const ArticleRatingAsync: FC<ArticleRatingProps> = (props) => {
  return (
    <Suspense fallback={<Skeleton width="100%" height={120} />}>
      <ArticleRatingLazy {...props} />
    </Suspense>
  );
};
