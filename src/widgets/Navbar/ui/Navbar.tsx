import React, { memo, useCallback, useMemo, useState } from "react";
import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Text, TextTheme } from "shared/ui/Text/Text";
import { LoginModal } from "features/AuthByUsername";
import { useDispatch, useSelector } from "react-redux";
import { getUserAuthData, isUserAdmin, isUserManager, userActions } from "entities/User";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { Dropdown, DropdownItem } from "shared/ui/Dropdown/Dropdown";
import { Avatar } from "shared/ui/Avatar/Avatar";
import cls from "./Navbar.module.scss";

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const authData = useSelector(getUserAuthData);

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  const onLogout = useCallback(() => {
    dispatch(userActions.logout());
  }, [dispatch]);

  const isAdminPanelAvailable = isAdmin || isManager;

  const dropdownItems: DropdownItem[] = useMemo(() => {
    const adminPanelItem = {
      content: t("Admin"),
      href: RoutePath.admin_panel,
    };

    return [
      ...(isAdminPanelAvailable ? [adminPanelItem] : []),
      {
        content: t("Profile"),
        href: RoutePath.profile + (authData?.id ?? ""),
      },
      {
        content: t("Logout"),
        onClick: onLogout,
      },
    ];
  }, [authData?.id, isAdminPanelAvailable, onLogout, t]);

  if (authData) {
    return (
      <header className={classNames(cls.navbar, {}, [className])}>
        <Text className={cls.appName} theme={TextTheme.INVERTED} title={t("Ivan Kashin App")} />
        <AppLink
          className={cls.createArticle}
          theme={AppLinkTheme.SECONDARY}
          to={RoutePath.article_create}
        >
          {t("Create article")}
        </AppLink>
        <Dropdown
          direction="bottom right"
          className={cls.dropdown}
          items={dropdownItems}
          trigger={<Avatar size={30} src={authData.avatar} />}
        />
      </header>
    );
  }

  return (
    <header className={classNames(cls.navbar, {}, [className])}>
      <Button onClick={onOpenModal} theme={ButtonTheme.CLEAR_INVERTED} className={cls.links}>
        {t("Login")}
      </Button>

      <LoginModal isOpen={isAuthModalOpen} onClose={onCloseModal} />
    </header>
  );
});
