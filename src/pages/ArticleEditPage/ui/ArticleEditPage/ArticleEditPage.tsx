import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import { Page } from "@/widgets/Page";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./ArticleEditPage.module.scss";

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo(function ArticleEditPage(
  props: ArticleEditPageProps
) {
  const { className } = props;

  const { t } = useTranslation();
  const { id } = useParams<{ id?: string }>();
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(cls.articleEditPage, {}, [className])}>
      {isEdit ? t("Editing the page with ID = ") + id : t("New page creation")}
    </Page>
  );
});

export default ArticleEditPage;
