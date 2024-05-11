import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CenteredContentDecorator } from '@/shared/config/storybook/CenteredContentDecorator/CenteredContentDecorator';
import { mockNotifications } from '@/shared/config/storybook/mocks/notifications.mock';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { RedesignedNotificationButton } from './RedesignedNotificationButton';

export default {
  title: 'features/NotificationButton/RedesignedNotificationButton',
  component: RedesignedNotificationButton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [CenteredContentDecorator(), StoreDecorator({})],
} as ComponentMeta<typeof RedesignedNotificationButton>;

const Template: ComponentStory<typeof RedesignedNotificationButton> = (
  args,
) => <RedesignedNotificationButton {...args} />;

export const Normal = Template.bind({});
Normal.args = {};
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/notifications`,
      method: 'GET',
      status: 200,
      response: mockNotifications,
    },
  ],
};
