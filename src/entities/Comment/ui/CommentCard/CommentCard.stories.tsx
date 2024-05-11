import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NewDesignDecorator } from '@/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';

import { CommentCard } from './CommentCard';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
  <CommentCard {...args} />
);

const normalArgs = {
  comment: {
    id: '1',
    text: 'Hello world',
    user: {
      id: '1',
      username: 'Ivan',
      avatar: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    },
  },
};

export const Normal = Template.bind({});
Normal.args = normalArgs;

export const NormalRedesigned = Template.bind({});
NormalRedesigned.args = normalArgs;
NormalRedesigned.decorators = [NewDesignDecorator];

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};

export const LoadingRedesigned = Template.bind({});
LoadingRedesigned.args = {
  isLoading: true,
};
LoadingRedesigned.decorators = [NewDesignDecorator];
