import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox as DeprecatedListBox } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';

import { Currency } from '../../model/consts/currency';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  onChange?: (value: Currency) => void;
  readonly?: boolean;
}

const options = Object.entries(Currency).map(([value, content]) => ({
  value,
  content,
}));

export const CurrencySelect = memo(function CurrencySelect(
  props: CurrencySelectProps,
) {
  const { className, value, onChange, readonly } = props;

  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange],
  );

  const listBoxProps = {
    className: classNames('', {}, [className]),
    label: t('Select currency'),
    items: options,
    value,
    defaultValue: t('Select currency'),
    onChange: onChangeHandler,
    readonly,
    direction: 'top right' as const,
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<ListBox {...listBoxProps} />}
      off={<DeprecatedListBox {...listBoxProps} />}
    />
  );
});
