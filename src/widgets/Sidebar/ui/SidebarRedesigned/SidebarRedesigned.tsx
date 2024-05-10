import React, { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLogo } from '@/shared/ui/redesigned/AppLogo';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { useSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarItem } from '../SidebarItem/SidebarItem';
import cls from './SidebarRedesigned.module.scss';

interface SidebarRedesignedProps {
  className?: string;
}

export const SidebarRedesigned = memo((props: SidebarRedesignedProps) => {
  const { className } = props;

  const [collapsed, setCollapsed] = useState(false);
  const sidebarItemsList = useSidebarItems();
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };

  const itemsList = useMemo(
    () =>
      sidebarItemsList.map((item) => (
        <SidebarItem item={item} collapsed={collapsed} key={item.text} />
      )),
    [collapsed, sidebarItemsList],
  );

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
      <AppLogo className={cls.appLogo} size={collapsed ? 30 : 50} />

      <VStack
        max
        role="navigation"
        className={cls.items}
        gap="8"
        align={collapsed ? 'center' : undefined}
      >
        {itemsList}
      </VStack>

      <Icon
        data-testid="sidebar-toggle"
        className={cls.collapseBtn}
        onClick={onToggle}
        Svg={ArrowIcon}
        clickable
      />

      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher short={collapsed} className={cls.langSwitcher} />
      </div>
    </aside>
  );
});
