import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CommentCard } from './CommentCard';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  comment: {
    id: '1',
    text: 'Hello world',
    user: { id: '1', username: 'Ivan', avatar: 'https://media.licdn.com/dms/image/D4D03AQE6aTfFmEGuCw/profile-displayphoto-shrink_400_400/0/1667567815186?e=1681948800&v=beta&t=WKAzRl331tmnaeYlBMf_6hUieqapb89RAeZ3QFefgdw' },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
