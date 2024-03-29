import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CenteredContentDecorator } from "@/shared/config/storybook/CenteredContentDecorator/CenteredContentDecorator";
import { mockNotifications } from "@/shared/config/storybook/mocks/notifications.mock";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

import { NotificationButton } from "./NotificationButton";

export default {
  title: "features/NotificationButton",
  component: NotificationButton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [CenteredContentDecorator(), StoreDecorator({})],
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => (
  <NotificationButton {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/notifications`,
      method: "GET",
      status: 200,
      response: mockNotifications,
    },
  ],
};
