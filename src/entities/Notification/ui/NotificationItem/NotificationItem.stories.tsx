import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { mockNotifications } from "@/shared/config/storybook/mocks/notifications.mock";

import { NotificationItem } from "./NotificationItem";

export default {
  title: "entities/Notification/NotificationItem",
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => (
  <NotificationItem {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  item: mockNotifications[0],
};

export const AsALink = Template.bind({});
AsALink.args = {
  item: mockNotifications[1],
};
