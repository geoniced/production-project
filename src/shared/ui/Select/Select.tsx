import { classNames, Mods } from "shared/lib/classNames/classNames";
import { ChangeEvent, memo, useCallback, useMemo } from "react";
import { typedMemo } from "shared/ui/TypedMemo/TypedMemo";
import cls from "./Select.module.scss";

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

export const Select = typedMemo(<T extends string>(props: SelectProps<T>) => {
  const { className, label, options, value, onChange, readonly } = props;

  const optionsList = useMemo(
    () =>
      options?.map(({ value, content }) => (
        <option className={cls.option} value={value} key={value}>
          {content}
        </option>
      )),
    [options]
  );

  const onChangeHandler = useCallback(
    (evt: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(evt.target.value as T);
    },
    [onChange]
  );

  const mods: Mods = {};

  return (
    <div className={classNames(cls.wrapper, {}, [className])}>
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <select disabled={readonly} className={cls.select} value={value} onChange={onChangeHandler}>
        {optionsList}
      </select>
    </div>
  );
});
