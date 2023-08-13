import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import React, { memo, useCallback, useMemo } from "react";
import { Avatar } from "shared/ui/Avatar/Avatar";
import { Dropdown } from "shared/ui/Popups";
import { DropdownItem } from "shared/ui/Popups/ui/Dropdown/Dropdown";
import { RoutePath } from "shared/config/routeConfig/routeConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from "entities/User";

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
      className={classNames(cls.avatarDropdown, {}, [className])}
      items={dropdownItems}
      trigger={<Avatar size={30} src={authData.avatar} />}
    />
  );
});
