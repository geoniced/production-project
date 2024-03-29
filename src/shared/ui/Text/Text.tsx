import { memo } from "react";

import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./Text.module.scss";

export enum TextTheme {
  PRIMARY = "primary",
  INVERTED = "inverted",
  ERROR = "error",
}

export enum TextAlign {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}

export enum TextSize {
  S = "size_s",
  M = "size_m",
  L = "size_l",
}

type HeaderTagType = "h1" | "h2" | "h3" | "p";

interface TextProps {
  className?: string;
  title?: string;
  text?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
  tag?: HeaderTagType;
  "data-testid"?: string;
}

// const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
//   [TextSize.S]: "h3",
//   [TextSize.M]: "h2",
//   [TextSize.L]: "h1",
// };

export const Text = memo(function Text(props: TextProps) {
  const {
    className,
    title,
    text,
    theme = TextTheme.PRIMARY,
    align = TextAlign.LEFT,
    size = TextSize.M,
    tag: HeaderTag = "div",
    "data-testid": dataTestId = "Text",
  } = props;

  return (
    <HeaderTag
      className={classNames(cls.text, {}, [
        className,
        cls[theme],
        cls[align],
        cls[size],
      ])}
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
    </HeaderTag>
  );
});
