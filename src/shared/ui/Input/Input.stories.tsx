import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Input } from "./Input";
import { Theme } from "@/shared/const/theme";

export default {
  title: "shared/Input",
  component: Input,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: "123123",
  placeholder: "Type text",
};

export const Dark = Template.bind({});
Dark.args = {
  value: "123123",
  placeholder: "Type text",
};
Dark.decorators = [ThemeDecorator(Theme.DARK)];

export const Autofocus = Template.bind({});
Autofocus.args = {
  placeholder: "Type text",
  autoFocus: true,
};
