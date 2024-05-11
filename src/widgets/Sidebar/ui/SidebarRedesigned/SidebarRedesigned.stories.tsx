import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { SidebarRedesigned } from './SidebarRedesigned';

export default {
  title: 'widgets/Sidebar/SidebarRedesigned',
  component: SidebarRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof SidebarRedesigned>;

const Template: ComponentStory<typeof SidebarRedesigned> = (args) => (
  <SidebarRedesigned {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
