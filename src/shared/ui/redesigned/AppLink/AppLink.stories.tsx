import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { AppLink } from './AppLink';

export default {
  title: 'shared/AppLink',
  component: AppLink,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => (
  <AppLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
  variant: 'primary',
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: 'Text',
  variant: 'primary',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'Text',
  variant: 'secondary',
};

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
  children: 'Text',
  variant: 'secondary',
};
SecondaryDark.decorators = [ThemeDecorator(Theme.DARK)];
