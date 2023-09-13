import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { UserRole } from "@/entities/User";
import { CenteredContentDecorator } from "@/shared/config/storybook/CenteredContentDecorator/CenteredContentDecorator";
import { AvatarDropdown } from "./AvatarDropdown";

export default {
  title: "features/AvatarDropdown",
  component: AvatarDropdown,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [
    CenteredContentDecorator(),
    StoreDecorator({
      user: {
        authData: {
          avatar: "https://avatars.githubusercontent.com/u/27809417?v=4",
          username: "Ivan Kashin",
          roles: [UserRole.MANAGER, UserRole.ADMIN],
          id: "111",
        },
      },
    }),
  ],
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => (
  <AvatarDropdown {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
