import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import AppSvg from '@/shared/assets/icons/app-image.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import { HStack } from '../../deprecated/Stack';
import cls from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
  size?: number;
}

export const AppLogo = memo((props: AppLogoProps) => {
  const { className, size = 50 } = props;

  const { t } = useTranslation();

  return (
    <HStack
      max
      justify="center"
      className={classNames(cls.appLogo, {}, [className])}
    >
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
      <AppSvg width={size} height={size} color="black" />
    </HStack>
  );
});
