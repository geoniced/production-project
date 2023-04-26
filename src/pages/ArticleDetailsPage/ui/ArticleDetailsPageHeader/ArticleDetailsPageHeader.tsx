import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppLink } from "shared/ui/AppLink/AppLink";
import { getArticleDetailsData } from "entities/Article";
import cls from "./ArticleDetailsPageHeader.module.scss";
import { getCanEditArticle } from "../../model/selectors/article";

interface ArticleDetailsPageHeaderProps {
  className?: string;
}

export const ArticleDetailsPageHeader = memo((props: ArticleDetailsPageHeaderProps) => {
  const { className } = props;
  const canEdit = useSelector(getCanEditArticle);
  const article = useSelector(getArticleDetailsData);

  const { t } = useTranslation("article-details");

  return (
    <div className={classNames(cls.articleDetailsPageHeader, {}, [className])}>
      <AppLink to={RoutePath.articles}>
        <Button theme={ButtonTheme.OUTLINE} className={cls.backToArticleListButton}>
          {t("Back to articles list")}
        </Button>
      </AppLink>
      {canEdit && (
        <AppLink to={`${RoutePath.article_details}${article?.id}/edit`} className={cls.editButton}>
          <Button theme={ButtonTheme.OUTLINE}>{t("Edit article")}</Button>
        </AppLink>
      )}
    </div>
  );
});
