import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Page } from "widgets/Page/Page";

const AdminPanelPage = memo(() => {
  const { t } = useTranslation("admin");

  return <Page>{t("Admin panel")}</Page>;
});

export default AdminPanelPage;
