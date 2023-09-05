import React, { memo, useCallback, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { LoginModal } from "features/AuthByUsername";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { HStack } from "shared/ui/Stack";
import { NotificationButton } from "features/NotificationButton";
import { AvatarDropdown } from "features/AvatarDropdown";
import { Drawer } from "shared/ui/Drawer/Drawer";
import { NotificationList } from "entities/Notification";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(function Navbar({ className }: NavbarProps) {
  const { t } = useTranslation();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  if (authData) {
    return (
      <header className={classNames(cls.navbar, {}, [className])}>
        <Text
          className={cls.appName}
          theme={TextTheme.INVERTED}
          title={t("Ivan Kashin App")}
        />
        <AppLink
          className={cls.createArticle}
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.article_create}
        >
          {t("Create article")}
        </AppLink>

        <HStack gap="16" className={cls.actions}>
          <NotificationButton />
          <AvatarDropdown />
        </HStack>
      </header>
    );
  }

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <Button
        onClick={onOpenModal}
        theme={ButtonTheme.CLEAR_INVERTED}
        className={cls.links}
      >
        {t("Login")}
      </Button>

      <LoginModal isOpen={isAuthModalOpen} onClose={onCloseModal} />
    </header>
  );
});
