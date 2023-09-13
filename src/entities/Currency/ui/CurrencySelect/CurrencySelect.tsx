import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ListBox } from "@/shared/ui/Popups/ui/ListBox/ListBox";
import { Currency } from "../../model/consts/currency";

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
  props: CurrencySelectProps
) {
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
      direction="top right"
    />
  );
});
