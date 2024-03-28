import React, { memo } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';

import { DeprecatedSidebar } from '../DeprecatedSidebar/DeprecatedSidebar';
import { SidebarRedesigned } from '../SidebarRedesigned/SidebarRedesigned';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(function Sidebar({ className }: SidebarProps) {
  return (
    <ToggleFeatures
      feature="isAppRedisigned"
      on={<SidebarRedesigned />}
      off={<DeprecatedSidebar />}
    />
  );
});
