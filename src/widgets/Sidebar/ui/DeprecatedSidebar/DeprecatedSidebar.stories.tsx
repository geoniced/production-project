import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { DeprecatedSidebar } from './DeprecatedSidebar';

export default {
  title: 'widgets/Sidebar/DeprecatedSidebar',
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
Normal.decorators = [StoreDecorator({})];
