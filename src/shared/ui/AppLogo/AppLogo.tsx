import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import AppSvg from '@/shared/assets/icons/app-image.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import { HStack } from '../Stack';
import cls from './AppLogo.module.scss';

interface AppLogoProps {
  className?: string;
}

export const AppLogo = memo((props: AppLogoProps) => {
  const { className } = props;

  const { t } = useTranslation();

  return (
    <HStack
      max
      justify="center"
      className={classNames(cls.appLogo, {}, [className])}
    >
      <div className={cls.gradientBig} />
      <div className={cls.gradientSmall} />
      <AppSvg />
    </HStack>
  );
});
