import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { RatingCard } from "@/entities/Rating";
import { getUserAuthData } from "@/entities/User";
import { Skeleton } from "@/shared/ui/Skeleton";

import {
  useGetArticleRating,
  useRateArticle,
} from "../../api/articleRatingApi";

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo((props: ArticleRatingProps) => {
  const { className, articleId } = props;
  const userData = useSelector(getUserAuthData);
  const { data, isLoading } = useGetArticleRating({
    articleId,
    userId: userData?.id ?? "",
  });
  const [rateArticleMutation] = useRateArticle();

  const { t } = useTranslation();

  const handleArticleRating = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateArticleMutation({
          userId: userData?.id ?? "",
          rate: starsCount,
          articleId,
          feedback,
        });
      } catch (err) {
        // handle error
        console.log(err);
      }
    },
    [articleId, rateArticleMutation, userData?.id]
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleArticleRating(starsCount, feedback);
    },
    [handleArticleRating]
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleArticleRating(starsCount);
    },
    [handleArticleRating]
  );

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  const rating = data?.[0];

  return (
    <RatingCard
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      className={className}
      title={t("Rate this article")}
      feedbackTitle={t(
        "Leave your feedback, it will improve the quality of our articles"
      )}
      hasFeedback
    />
  );
});

export default ArticleRating;
