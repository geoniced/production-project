import React from "react";

import { classNames } from "@/shared/lib/classNames/classNames";

import UserIcon from "../../assets/icons/user-filled.svg";
import { AppImage } from "../AppImage";
import { Icon } from "../Icon";
import { Skeleton } from "../Skeleton";
import cls from "./Avatar.module.scss";

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
  fallbackInverted?: boolean;
}

export const Avatar = (props: AvatarProps) => {
  const { className, src, alt, size = 100, fallbackInverted } = props;

  const fallback = <Skeleton width={size} height={size} borderRadius="50%" />;
  const errorFallback = (
    <Icon
      inverted={fallbackInverted}
      Svg={UserIcon}
      width={size}
      height={size}
    />
  );

  return (
    <AppImage
      className={classNames(cls.avatar, {}, [className])}
      src={src}
      alt={alt}
      width={size}
      height={size}
      fallback={fallback}
      errorFallback={errorFallback}
    />
  );
};
