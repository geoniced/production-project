import { VStackProps } from './VStack';
import { getFlex } from '../Flex/getFlex';

export const getVStack = (props: Omit<VStackProps, 'children'>) => {
  const { align = 'start' } = props;

  return getFlex({ ...props, direction: 'column', align });
};
