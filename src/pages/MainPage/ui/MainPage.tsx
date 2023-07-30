import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "widgets/Page/Page";

const MainPage = memo(function MainPage() {
  const { t } = useTranslation("main");
  return <Page>{t("Main page")}</Page>;
});

export default MainPage;
