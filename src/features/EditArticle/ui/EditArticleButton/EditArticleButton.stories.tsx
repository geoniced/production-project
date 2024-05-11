import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { EditArticleButton } from './EditArticleButton';

export default {
  title: 'features/EditArticle/EditArticleButton',
  component: EditArticleButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EditArticleButton>;

const Template: ComponentStory<typeof EditArticleButton> = (args) => (
  <EditArticleButton {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
  StoreDecorator({
    articleDetails: {
      data: {
        id: '1',
        user: { id: '1' },
      },
    },
    user: {
      authData: {
        id: '1',
      },
    },
  }),
];
