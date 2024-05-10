import { memo } from 'react';

import { ScrollToTopButton } from '@/features/ScrollToTopButton';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/redesigned/Stack';

import cls from './ScrollToolbar.module.scss';

interface ScrollToolbarProps {
  className?: string;
}

export const ScrollToolbar = memo((props: ScrollToolbarProps) => {
  const { className } = props;

  return (
    <VStack
      max
      align="center"
      justify="center"
      className={classNames(cls.scrollToolbar, {}, [className])}
    >
      <ScrollToTopButton />
    </VStack>
  );
});
