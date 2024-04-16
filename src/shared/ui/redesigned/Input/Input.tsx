import React, { InputHTMLAttributes, memo, ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import cls from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
>;

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  autoFocus?: boolean;
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Input = memo(function Input(props: InputProps) {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    readOnly,
    autoFocus = false,
    addonLeft,
    addonRight,
    ...otherProps
  } = props;

  // const [isFocused, setIsFocused] = useState(false);
  //
  // const onBlur = () => {
  //   setIsFocused(false);
  // };
  //
  // const onFocus = () => {
  //   setIsFocused(true);
  // };

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    onChange?.(value);
  };

  const mods: Mods = {
    // [cls.focused]: isFocused,
    [cls.withAddonLeft]: Boolean(addonLeft),
    [cls.withAddonRight]: Boolean(addonRight),
  };

  return (
    <div className={classNames(cls.inputWrapper, mods, [className])}>
      {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
      <input
        type={type}
        value={value}
        onChange={changeHandler}
        className={cls.input}
        spellCheck={false}
        readOnly={readOnly}
        autoFocus={autoFocus}
        placeholder={placeholder}
        // onBlur={onBlur}
        // onFocus={onFocus}
        {...otherProps}
      />
      {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
    </div>
  );
});
