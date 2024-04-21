import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

import { getFlex } from './getFlex';

export type FlexJustify = 'start' | 'end' | 'center' | 'between';
export type FlexAlign = 'start' | 'end' | 'center';
export type FlexDirection = 'row' | 'column';
export type FlexGap = '4' | '8' | '16' | '24' | '32';

type DivProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export interface FlexProps extends DivProps {
  className?: string;
  children: ReactNode;
  justify?: FlexJustify;
  align?: FlexAlign;
  direction: FlexDirection;
  gap?: FlexGap;
  max?: boolean;
}

export const Flex = (props: FlexProps) => {
  const {
    className,
    children,
    justify = 'start',
    align = 'center',
    direction = 'row',
    gap,
    max,
    ...otherProps
  } = props;

  const flexClassNames = getFlex({
    className,
    gap,
    max,
    justify,
    direction,
    align,
  });

  return (
    <div className={flexClassNames} {...otherProps}>
      {children}
    </div>
  );
};
