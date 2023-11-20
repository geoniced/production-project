import { memo } from "react";

import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { getArticleDetailsData } from "@/entities/Article";
import { getRouteArticles, getRouteEditArticle } from "@/shared/const/router";
import { classNames } from "@/shared/lib/classNames/classNames";
import { AppLink } from "@/shared/ui/AppLink";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { HStack } from "@/shared/ui/Stack";

import { getCanEditArticle } from "../../model/selectors/article";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo(function ArticleDetailsPageHeader(
  props: ArticleDetailsPageHeaderProps
) {
  const { className } = props;
  const canEdit = useSelector(getCanEditArticle);
  const article = useSelector(getArticleDetailsData);

  const { t } = useTranslation("article-details");

  return (
    <HStack justify="between" max className={classNames("", {}, [className])}>
      <AppLink to={getRouteArticles()}>
        <Button theme={ButtonTheme.OUTLINE}>
          {t("Back to articles list")}
        </Button>
      </AppLink>
      {canEdit && article?.id && (
        <AppLink to={getRouteEditArticle(article.id)}>
          <Button theme={ButtonTheme.OUTLINE}>{t("Edit article")}</Button>
        </AppLink>
      )}
    </HStack>
  );
});
