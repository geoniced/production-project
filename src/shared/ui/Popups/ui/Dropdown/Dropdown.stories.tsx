import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CenteredContentDecorator } from "@/shared/config/storybook/CenteredContentDecorator/CenteredContentDecorator";
import { Button } from "../../../Button/Button";
import { Dropdown } from "./Dropdown";

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
