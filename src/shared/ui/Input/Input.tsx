import { classNames } from 'shared/lib/classNames/classNames';
import React, { InputHTMLAttributes, memo, useState } from 'react';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

const FONT_CHARACTER_WIDTH = 9;

export const Input = memo((props: InputProps) => {
  const {
    className,
    value,
    onChange,
    type = 'text',
    placeholder,
    ...otherProps
  } = props;

  const [caretPosition, setCaretPosition] = useState(0);

  const changeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    onChange?.(value);
    setCaretPosition(value.length);
  };

  const selectHandler = (evt: React.SyntheticEvent<HTMLInputElement, Event>) => {
    if (evt.target instanceof HTMLInputElement) {
      setCaretPosition(evt?.target?.selectionStart || 0);
    }
  };

  return (
    <div className={classNames(cls.inputWrapper, {}, [className])}>
      {placeholder && (
        <div className={cls.placeholder}>
          {`${placeholder}>`}
        </div>
      )}
      <div className={cls.caretWrapper}>
        <input
          type={type}
          value={value}
          onChange={changeHandler}
          onSelect={selectHandler}
          className={cls.input}
          spellCheck={false}
          {...otherProps}
        />
        <span
          className={cls.caret}
          style={{ left: `${caretPosition * FONT_CHARACTER_WIDTH}px` }}
        />
      </div>
    </div>
  );
});
