import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NavbarRedesigned } from './NavbarRedesigned';

export default {
  title: 'shared/NavbarRedesigned',
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
