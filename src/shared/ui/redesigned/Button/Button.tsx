import { ButtonHTMLAttributes, ReactNode } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import cls from './Button.module.scss';

export type ButtonVariant = 'clear' | 'outline' | 'filled';

export type ButtonSize = 'm' | 'l' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  /**
   * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный главной теме)
   */
  variant?: ButtonVariant;
  /**
   * Флаг делающий кнопку квадратной
   */
  square?: boolean;
  /**
   * Размер кнопки в соответствии дизайн системе
   */
  size?: ButtonSize;
  /**
   * Содержимое кнопки
   */
  children?: ReactNode;
  /**
   * Сделать кнопку на полную ширину
   */
  fullWidth?: boolean;
  /**
   * Дополнительные компоненты справа/слева
   */
  addonLeft?: ReactNode;
  addonRight?: ReactNode;
}

export const Button = (props: ButtonProps) => {
  const {
    className,
    children,
    variant = 'outline',
    square,
    size = 'm',
    fullWidth,
    addonLeft,
    addonRight,
    ...otherProps
  } = props;

  const mods: Mods = {
    [cls.square]: square,
    [cls.fullWidth]: fullWidth,
    [cls.withAddon]: Boolean(addonRight) || Boolean(addonLeft),
  };

  return (
    <button
      type="button"
      className={classNames(cls.button, mods, [
        className,
        cls[variant],
        cls[size],
      ])}
      {...otherProps}
    >
      {addonLeft && <div className={cls.addonLeft}>{addonLeft}</div>}
      {children}
      {addonRight && <div className={cls.addonRight}>{addonRight}</div>}
    </button>
  );
};