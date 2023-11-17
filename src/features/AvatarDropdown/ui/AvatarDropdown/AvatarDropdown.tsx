import { useTranslation } from "react-i18next";
import React, { memo, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Avatar } from "@/shared/ui/Avatar";
import { Dropdown, DropdownItem } from "@/shared/ui/Popups";
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "@/entities/User";
import { RoutePath } from "@/shared/const/router";

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo((props: AvatarDropdownProps) => {
  const { className } = props;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const authData = useSelector(getUserAuthData);

  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);
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

  if (!authData) {
    return null;
  }

  return (
    <Dropdown
      direction="bottom right"
      className={classNames("", {}, [className])}
      items={dropdownItems}
      trigger={<Avatar size={30} src={authData.avatar} />}
    />
  );
});
