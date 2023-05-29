import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Select } from "shared/ui/Select/Select";
import { memo, useCallback } from "react";
import { ListBox } from "shared/ui/ListBox/ListBox";
import { Currency } from "../../model/types/currency";

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

export const CurrencySelect = memo((props: CurrencySelectProps) => {
  const { className, value, onChange, readonly } = props;

  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Currency);
    },
    [onChange]
  );

  return (
    <ListBox
      className={classNames("", {}, [className])}
      label={t("Select currency")}
      items={options}
      value={value}
      defaultValue={t("Select currency")}
      onChange={onChangeHandler}
      readonly={readonly}
      direction="top"
    />
  );
});
