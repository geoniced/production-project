import { useTranslation } from 'react-i18next';
import React from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
}

export const Avatar = (props: AvatarProps) => {
  const {
    className,
    src,
    alt,
    size = 100,
  } = props;

  return (
    <img
      className={classNames(cls.avatar, {}, [className])}
      src={src}
      alt={alt}
      width={size}
      height={size}
    />
  );
};
