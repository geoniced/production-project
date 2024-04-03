import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/redesigned/Button';

import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
  className?: string;
  short?: boolean;
}

export const LangSwitcher = memo(function LangSwitcher({
  className,
  short,
}: LangSwitcherProps) {
  const { t, i18n } = useTranslation();

  const onToggleClick = async () => {
    i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
  };

  return (
    <ToggleFeatures
      feature="isAppRedisigned"
      on={
        <Button variant="clear" onClick={onToggleClick}>
          {short ? t('Short language') : t('Language')}
        </Button>
      }
      off={
        <ButtonDeprecated
          theme={ButtonTheme.CLEAR}
          className={classNames(cls.langSwitcher, {}, [className])}
          type="button"
          onClick={onToggleClick}
        >
          {short ? t('Short language') : t('Language')}
        </ButtonDeprecated>
      }
    />
  );
});
