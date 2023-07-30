import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button/Button";
import { memo } from "react";
import { HStack } from "shared/ui/Stack";
import cls from "./PageError.module.scss";

interface PageErrorProps {
  className?: string;
}

export const PageError = memo(function PageError({
  className,
}: PageErrorProps) {
  const { t } = useTranslation();

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className={classNames(cls.pageError, {}, [className])}>
      <HStack gap="16">
        <p>{t("An unexpected error has occured")}</p>
        <Button onClick={reloadPage}>{t("Reload page")}</Button>
      </HStack>
    </div>
  );
});
