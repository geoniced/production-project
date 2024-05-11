import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { NavbarRedesigned } from './NavbarRedesigned';

export default {
  title: 'widgets/Navbar/NavbarRedesigned',
  component: NavbarRedesigned,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NavbarRedesigned>;

const Template: ComponentStory<typeof NavbarRedesigned> = (args) => (
  <NavbarRedesigned {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
