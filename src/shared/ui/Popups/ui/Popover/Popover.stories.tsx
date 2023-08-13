import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CenteredContentDecorator } from "shared/config/storybook/CenteredContentDecorator/CenteredContentDecorator";
import { Button } from "../../../Button/Button";
import { Popover } from "./Popover";

export default {
  title: "shared/Popover",
  component: Popover,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [CenteredContentDecorator()],
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <Popover {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  trigger: <Button>Open!</Button>,
  children: (
    <>
      <div>first</div>
      <div>second</div>
      <div>third</div>
    </>
  ),
};
