import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { NavbarDeprecated } from './NavbarDeprecated';

export default {
  title: 'widgets/Navbar/NavbarDeprecated',
  component: NavbarDeprecated,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NavbarDeprecated>;

const Template: ComponentStory<typeof NavbarDeprecated> = (args) => (
  <NavbarDeprecated {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
