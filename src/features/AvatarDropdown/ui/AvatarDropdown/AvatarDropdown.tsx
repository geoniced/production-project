import React, { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import {
  getUserAuthData,
  isUserAdmin,
  isUserManager,
  userActions,
} from '@/entities/User';
import { getRouteAdmin, getRouteProfile } from '@/shared/const/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Dropdown, DropdownItem } from '@/shared/ui/deprecated/Popups';

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
      content: t('Admin'),
      href: getRouteAdmin(),
    };

    return [
      ...(isAdminPanelAvailable ? [adminPanelItem] : []),
      {
        content: t('Profile'),
        href: getRouteProfile(authData?.id ?? ''),
      },
      {
        content: t('Logout'),
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
      className={classNames('', {}, [className])}
      items={dropdownItems}
      trigger={<Avatar fallbackInverted size={30} src={authData.avatar} />}
    />
  );
});
