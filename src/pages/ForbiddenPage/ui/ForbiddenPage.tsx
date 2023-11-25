import React, { memo } from "react";
import { useTranslation } from "react-i18next";

import { Page } from "@/widgets/Page";

const ForbiddenPage = memo(function ForbiddenPage() {
  const { t } = useTranslation();

  return (
    <Page data-testid="ForbiddenPage">
      {t("You do not have access to this page")}
    </Page>
  );
});

export default ForbiddenPage;
