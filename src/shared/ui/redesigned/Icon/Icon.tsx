import React, { memo, SVGProps } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Icon.module.scss';

type SVGElementProps = Omit<SVGProps<SVGSVGElement>, 'onClick'>;

interface IconBaseProps extends SVGElementProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>;
}

interface NonClickableIconProps extends IconBaseProps {
  clickable?: false;
}

interface ClickableIconProps extends IconBaseProps {
  clickable: true;
  onClick: () => void;
}

type IconProps = NonClickableIconProps | ClickableIconProps;

export const Icon = memo(function Icon(props: IconProps) {
  const {
    className,
    width = 32,
    height = 32,
    clickable,
    Svg,
    ...otherProps
  } = props;

  const icon = (
    <Svg
      className={classNames(cls.icon, {}, [clickable ? undefined : className])}
      width={width}
      height={height}
      {...otherProps}
      onClick={undefined}
    />
  );

  if (clickable) {
    return (
      <button
        className={classNames(cls.button, {}, [className])}
        type="button"
        onClick={props.onClick}
      >
        {icon}
      </button>
    );
  }

  return icon;
});
