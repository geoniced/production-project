import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { mockNotifications } from "@/shared/config/storybook/mocks/notifications.mock";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

import { NotificationList } from "./NotificationList";

export default {
  title: "entities/Notification/NotificationList",
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [StoreDecorator({})],
  parameters: {
    mockData: [
      {
        url: `${__API__}/notifications`,
        method: "GET",
        status: 200,
        response: mockNotifications,
        delay: 500,
      },
    ],
  },
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => (
  <NotificationList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
