import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";

import { classNames } from "@/shared/lib/classNames/classNames";
import { ListBox } from "@/shared/ui/Popups";

import { Country } from "../../model/consts/country";

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
  props: CountrySelectProps
) {
  const { className, value, onChange, readonly } = props;

  const { t } = useTranslation();

  const onChangeHandler = useCallback(
    (value: string) => {
      onChange?.(value as Country);
    },
    [onChange]
  );

  return (
    <ListBox
      className={classNames("", {}, [className])}
      label={t("Select country")}
      defaultValue={t("Select country")}
      items={options}
      value={value}
      onChange={onChangeHandler}
      readonly={readonly}
      direction="top right"
    />
  );
});
