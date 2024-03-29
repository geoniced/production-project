import React, { memo } from "react";
import { useTranslation } from "react-i18next";

import { Page } from "@/widgets/Page";

const AboutPage = memo(function AboutPage() {
  const { t } = useTranslation("about");

  return <Page data-testid="AboutPage">{t("About page")}</Page>;
});

export default AboutPage;
