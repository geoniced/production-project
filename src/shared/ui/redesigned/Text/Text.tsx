import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Text.module.scss';

export type TextVariant = 'primary' | 'error' | 'accent';

export type TextAlign = 'left' | 'right' | 'center';

export type TextSize = 's' | 'm' | 'l';

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'p';

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  variant?: TextVariant;
  align?: TextAlign;
  size?: TextSize;
  bold?: boolean;
  tag?: HeaderTagType;
  'data-testid'?: string;
}

const mapSizeToClass: Record<TextSize, string> = {
  s: 'size_s',
  m: 'size_m',
  l: 'size_l',
};

export const Text = memo(function Text(props: TextProps) {
  const {
    className,
    title,
    text,
    variant = 'primary',
    align = 'left',
    size = 'm',
    bold,
    tag: HeaderTag = 'div',
    'data-testid': dataTestId = 'Text',
  } = props;

  const sizeClass = mapSizeToClass[size];
  const additionalClasses = [
    className,
    cls[variant],
    cls[align],
    cls[sizeClass],
  ];

  return (
    <div
      className={classNames(cls.text, { [cls.bold]: bold }, additionalClasses)}
    >
      {title && (
        <HeaderTag data-testid={`${dataTestId}.Header`} className={cls.title}>
          {title}
        </HeaderTag>
      )}
      {text && (
        <p data-testid={`${dataTestId}.Paragraph`} className={cls.text}>
          {text}
        </p>
      )}
    </div>
  );
});
