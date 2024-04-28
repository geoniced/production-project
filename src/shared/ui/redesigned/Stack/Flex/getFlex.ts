import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import {
  FlexAlign,
  FlexDirection,
  FlexGap,
  FlexJustify,
  FlexProps,
} from './Flex';
import cls from './Flex.module.scss';

const justifyClasses: Record<FlexJustify, string> = {
  start: cls.justifyStart,
  end: cls.justifyEnd,
  center: cls.justifyCenter,
  between: cls.justifyBetween,
};

const alignClasses: Record<FlexAlign, string> = {
  start: cls.alignStart,
  end: cls.alignEnd,
  center: cls.alignCenter,
};

const directionClasses: Record<FlexDirection, string> = {
  row: cls.directionRow,
  column: cls.directionColumn,
};

const gapClasses: Record<FlexGap, string> = {
  4: cls.gap4,
  8: cls.gap8,
  16: cls.gap16,
  24: cls.gap24,
  32: cls.gap32,
};

export const getFlex = ({
  className,
  direction,
  justify,
  gap,
  max,
  align,
  wrap = 'nowrap',
}: Omit<FlexProps, 'children'>) => {
  const mods: Mods = {
    [cls.max]: max,
  };

  const classes = [
    className,
    justify && justifyClasses[justify],
    align && alignClasses[align],
    directionClasses[direction],
    gap && gapClasses[gap],
    cls[wrap],
  ];

  return classNames(cls.flex, mods, classes);
};
