import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
// use static dirs or change webpack config so you can use local paths for storybook builds
// FYI: lesson #109
// import avatar from 'shared/assets/tests/storybook.jpeg';
import { AVATAR } from '@/shared/assets/tests/avatar';
import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => (
  <ProfileCard {...args} />
);

const primaryArgs = {
  data: {
    username: 'admin',
    age: 22,
    country: Country.Kyrgyzstan,
    lastname: 'Pupkin',
    firstname: 'Vasya',
    city: 'Osh',
    currency: Currency.EUR,
    avatar: AVATAR,
  },
};

export const Primary = Template.bind({});
Primary.args = primaryArgs;

export const PrimaryRedesigned = Template.bind({});
PrimaryRedesigned.args = primaryArgs;
PrimaryRedesigned.decorators = [NewDesignDecorator];

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const WithError = Template.bind({});
WithError.args = {
  error: 'error',
};
