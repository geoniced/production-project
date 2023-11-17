import { useTranslation } from "react-i18next";
import { memo } from "react";
import { useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { AppLink } from "@/shared/ui/AppLink";
import { getArticleDetailsData } from "@/entities/Article";
import { HStack } from "@/shared/ui/Stack";
import { getCanEditArticle } from "../../model/selectors/article";
import { RoutePath } from "@/shared/const/router";

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
      <AppLink to={RoutePath.articles}>
        <Button theme={ButtonTheme.OUTLINE}>
          {t("Back to articles list")}
        </Button>
      </AppLink>
      {canEdit && (
        <AppLink to={`${RoutePath.article_details}${article?.id}/edit`}>
          <Button theme={ButtonTheme.OUTLINE}>{t("Edit article")}</Button>
        </AppLink>
      )}
    </HStack>
  );
});
