import { classNames } from "shared/lib/classNames/classNames";
import React, { memo } from "react";
import cls from "./Overlay.module.scss";

interface OverlayProps {
  className?: string;
  onClick?: (evt: React.MouseEvent) => void;
}

export const Overlay = memo((props: OverlayProps) => {
  const { className, onClick } = props;

  return (
    <div
      onClick={onClick}
      className={classNames(cls.overlay, {}, [className])}
    />
  );
});
