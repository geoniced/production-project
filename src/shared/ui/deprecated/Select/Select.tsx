import { ChangeEvent, useCallback, useMemo } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { TestProps } from '@/shared/types/tests';

import { typedMemo } from '../../redesigned/TypedMemo/TypedMemo';
import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> extends TestProps {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  onChange?: (value: T) => void;
  readonly?: boolean;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Select = typedMemo(function Select<T extends string>(
  props: SelectProps<T>,
) {
  const { className, label, options, value, onChange, readonly } = props;

  const optionsList = useMemo(
    () =>
      options?.map(({ value, content }) => (
        <option
          className={cls.option}
          value={value}
          key={value}
          // data-testid={`${props["data-testid"]}.option.${value}`}
        >
          {content}
        </option>
      )),
    [options],
  );

  const onChangeHandler = useCallback(
    (evt: ChangeEvent<HTMLSelectElement>) => {
      onChange?.(evt.target.value as T);
    },
    [onChange],
  );

  const mods: Mods = {};

  return (
    <div
      className={classNames(cls.wrapper, {}, [className])}
      data-testid={props['data-testid']}
    >
      {label && <span className={cls.label}>{`${label}>`}</span>}
      <select
        disabled={readonly}
        className={cls.select}
        value={value}
        onChange={onChangeHandler}
        data-testid={`${props['data-testid']}.select`}
      >
        {optionsList}
      </select>
    </div>
  );
});
