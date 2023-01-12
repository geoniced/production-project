import { classNames, Mods } from 'shared/lib/classNames/classNames';
import {
  ChangeEvent,
  memo, useCallback, useMemo,
} from 'react';
import cls from './Select.module.scss';

export interface SelectOption {
  value: string;
  content: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  readonly?: boolean;
}

export const Select = memo((props: SelectProps) => {
  const {
    className,
    label,
    options,
    value,
    onChange,
    readonly,
  } = props;

  const optionsList = useMemo(() => options?.map(({ value, content }) => (
    <option
      className={cls.option}
      value={value}
      key={value}
    >
      {content}
    </option>
  )), [options]);

  const onChangeHandler = useCallback((evt: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(evt.target.value);
  }, [onChange]);

  const mods: Mods = {};

  return (
    <div className={classNames(cls.wrapper, {}, [className])}>
      {label && (
        <span className={cls.label}>
          {`${label}>`}
        </span>
      )}
      <select
        disabled={readonly}
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  );
});
