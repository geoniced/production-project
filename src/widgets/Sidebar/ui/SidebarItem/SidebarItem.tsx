import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  AppLink as DeprecatedAppLink,
  AppLinkTheme,
} from '@/shared/ui/deprecated/AppLink';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Icon } from '@/shared/ui/redesigned/Icon';

import { SidebarItemType } from '../../model/types/sidebar';
import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed?: boolean;
}

const DeprecatedSidebarItem = memo(function DeprecatedSidebarItem(
  props: SidebarItemProps,
) {
  const { item, collapsed } = props;

  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);
  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <DeprecatedAppLink
      theme={AppLinkTheme.SECONDARY}
      className={classNames(cls.item, { [cls.collapsed]: collapsed })}
      to={item.path}
    >
      <item.Icon className={cls.icon} />
      <span className={cls.link}>{t(item.text)} </span>
    </DeprecatedAppLink>
  );
});

const RedesignedSidebarItem = memo(function RedesignedSidebarItem(
  props: SidebarItemProps,
) {
  const { item, collapsed } = props;

  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);
  if (item.authOnly && !isAuth) {
    return null;
  }

  return (
    <AppLink
      className={classNames(cls.itemRedesigned, {
        [cls.collapsedRedesigned]: collapsed,
      })}
      to={item.path}
      activeClassName={cls.active}
    >
      <Icon Svg={item.Icon} />
      <span className={cls.link}>{t(item.text)} </span>
    </AppLink>
  );
});

export const SidebarItem = memo(function SidebarItem(props: SidebarItemProps) {
  return (
    <ToggleFeatures
      feature="isAppRedisigned"
      on={<RedesignedSidebarItem {...props} />}
      off={<DeprecatedSidebarItem {...props} />}
    />
  );
});
