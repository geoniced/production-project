import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NavbarDeprecated } from './NavbarDeprecated';

export default {
  title: 'shared/NavbarDeprecated',
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
