import React, { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLogo } from '@/shared/ui/AppLogo';

import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import cls from './SidebarRedesigned.module.scss';

interface SidebarRedesignedProps {
  className?: string;
}

export const SidebarRedesigned = memo((props: SidebarRedesignedProps) => {
  const { className } = props;

  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSelector(getSidebarItems);
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const { t } = useTranslation();

  return (
    <aside
      data-testid="sidebar"
      className={classNames(
        cls.sidebarRedesigned,
        { [cls.collapsed]: collapsed },
        [className],
      )}
    >
      <AppLogo className={cls.appLogo} />
    </aside>
  );
});
