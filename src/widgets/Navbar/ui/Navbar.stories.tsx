import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import withMock from "storybook-addon-mock";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { mockNotifications } from "@/shared/config/storybook/mocks/notifications.test";
import { Navbar } from "./Navbar";
import { Theme } from "@/shared/const/theme";

export default {
  title: "widgets/Navbar",
  component: Navbar,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [withMock],
  parameters: {
    mockData: [
      {
        url: `${__API__}/notifications`,
        method: "GET",
        status: 200,
        response: mockNotifications,
      },
    ],
  },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [StoreDecorator({})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [ThemeDecorator(Theme.DARK), StoreDecorator({})];

export const AuthNavbar = Template.bind({});
AuthNavbar.args = {};
AuthNavbar.decorators = [
  StoreDecorator({
    user: {
      authData: {
        avatar:
          "https://digi.kg/_next/image?url=%2Fimages%2Fteam_avatars%2Fivan.jpg&w=384&q=75",
      },
    },
  }),
];
