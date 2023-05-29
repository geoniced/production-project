import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { action } from "@storybook/addon-actions";
import { ListBox, ListBoxItem } from "./ListBox";

export default {
  title: "shared/ListBox",
  component: ListBox,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
  <ListBox {...args} />
);

const items: ListBoxItem[] = [
  {
    value: "1",
    content: "First value",
  },
  {
    value: "2",
    content: "Second value",
  },
  {
    value: "3",
    content: "Third value",
    disabled: true,
  },
  {
    value: "4",
    content: "Fourth value",
  },
];

export const Normal = Template.bind({});
Normal.args = {
  defaultValue: "Choose item",
  items,
  onChange: action("onChange"),
};
