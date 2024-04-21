import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { ListBox as DeprecatedListBox } from '@/shared/ui/deprecated/Popups';
import { ListBox } from '@/shared/ui/redesigned/Popups';

import { Country } from '../../model/consts/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = Object.entries(Country).map(([value, content]) => ({
  value,
  content,
}));

export const CountrySelect = memo(function CountrySelect(
  props: CountrySelectProps,
) {
  const { className, value, onChange, readonly } = props;

  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange],
  );

  const listBoxProps = {
    className: classNames('', {}, [className]),
    label: t('Select country'),
    defaultValue: t('Select country'),
    items: options,
    value,
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
