import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CenteredContentDecorator } from "@/shared/config/storybook/CenteredContentDecorator/CenteredContentDecorator";

import { Dropdown } from "./Dropdown";
import { Button } from "../../../Button/Button";

export default {
  title: "shared/Popover",
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [CenteredContentDecorator()],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  trigger: <Button>Open!</Button>,
  items: [
    {
      content: "first",
    },
    {
      content: "second",
    },
    {
      content: "third",
    },
  ],
};
