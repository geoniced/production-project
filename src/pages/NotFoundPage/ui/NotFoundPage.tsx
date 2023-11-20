import { memo } from "react";
import { useTranslation } from "react-i18next";

import { Page } from "@/widgets/Page";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./NotFoundPage.module.scss";

interface NotFoundPageProps {
  className?: string;
}

export const NotFoundPage = memo(function NotFoundPage({
  className,
}: NotFoundPageProps) {
  const { t } = useTranslation();

  return (
    <Page className={classNames(cls.notFoundPage, {}, [className])}>
      {t("Page not found")}
    </Page>
  );
});
