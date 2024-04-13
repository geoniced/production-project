import { HStackProps } from './HStack';
import { getFlex } from '../Flex/getFlex';

export const getHStack = (props: Omit<HStackProps, 'children'>) => {
  return getFlex({ ...props, direction: 'row' });
};
