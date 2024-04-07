import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme } from '@/shared/const/theme';

import { Text } from './Text';

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
};
export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
};
PrimaryDark.decorators = [ThemeDecorator(Theme.DARK)];
export const Error = Template.bind({});
Error.args = {
  title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
  variant: 'error',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
};
export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
  title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
};
OnlyTitleDark.decorators = [ThemeDecorator(Theme.DARK)];

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
};
export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
};
OnlyTextDark.decorators = [ThemeDecorator(Theme.DARK)];

export const SizeL = Template.bind({});
SizeL.args = {
  size: 'l',
  title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',

  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
};

export const SizeM = Template.bind({});
SizeM.args = {
  size: 'm',
  title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',

  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
};

export const SizeS = Template.bind({});
SizeS.args = {
  size: 's',
  title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',

  text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
};
