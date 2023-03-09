import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentList } from './CommentList';

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  comments: [
    {
      id: '1',
      text: 'Hello world',
      user: { id: '1', username: 'Ivan', avatar: 'https://media.licdn.com/dms/image/D4D03AQE6aTfFmEGuCw/profile-displayphoto-shrink_400_400/0/1667567815186?e=1681948800&v=beta&t=WKAzRl331tmnaeYlBMf_6hUieqapb89RAeZ3QFefgdw' },
    },
    {
      id: '2',
      text: 'Comment 2',
      user: { id: '2', username: 'Admin' },
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  comments: [],
  isLoading: true,
};
