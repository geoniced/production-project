import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { ArticleAdditionalInfo } from './ArticleAdditionalInfo';

export default {
  title: 'widgets/ArticleAdditionalInfo',
  component: ArticleAdditionalInfo,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticleAdditionalInfo>;

const Template: ComponentStory<typeof ArticleAdditionalInfo> = (args) => (
  <ArticleAdditionalInfo {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  articleId: '1',
  author: {
    id: '1',
    username: 'Ivan Kashin ArticleWriter',
    avatar: 'https://avatars.githubusercontent.com/u/27809417?v=4',
  },
  views: 1022,
  createdAt: '26.02.2022',
};
Normal.decorators = [StoreDecorator({})];
