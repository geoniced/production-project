import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DeprecatedSidebar } from './DeprecatedSidebar';

export default {
  title: 'shared/DeprecatedSidebar',
  component: DeprecatedSidebar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof DeprecatedSidebar>;

const Template: ComponentStory<typeof DeprecatedSidebar> = (args) => (
  <DeprecatedSidebar {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
