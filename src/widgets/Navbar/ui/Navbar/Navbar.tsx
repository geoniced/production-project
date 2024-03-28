import React, { memo } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';

import { NavbarDeprecated } from '../NavbarDeprecated/NavbarDeprecated';
import { NavbarRedesigned } from '../NavbarRedesigned/NavbarRedesigned';

interface NavbarProps {
  className?: string;
}

export const Navbar = memo(function Navbar({ className }: NavbarProps) {
  return (
    <ToggleFeatures
      feature="isAppRedisigned"
      on={<NavbarRedesigned className={className} />}
      off={<NavbarDeprecated className={className} />}
    />
  );
});
