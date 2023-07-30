import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "widgets/Page/Page";

const AboutPage = memo(function AboutPage() {
  const { t } = useTranslation("about");

  return <Page>{t("About page")}</Page>;
});

export default AboutPage;
