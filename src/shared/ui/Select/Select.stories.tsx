import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CenteredContentDecorator } from "@/shared/config/storybook/CenteredContentDecorator/CenteredContentDecorator";
import { Select } from "./Select";

export default {
  title: "shared/Select",
  component: Select,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
  decorators: [CenteredContentDecorator()],
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Enter value",
  options: [
    { value: "1", content: "First option" },
    { value: "2", content: "Second option" },
    { value: "3", content: "Third option" },
  ],
};
