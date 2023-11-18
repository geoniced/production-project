import React from "react";

import { action } from "@storybook/addon-actions";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CenteredContentDecorator } from "@/shared/config/storybook/CenteredContentDecorator/CenteredContentDecorator";

import { ListBox, ListBoxItem } from "./ListBox";

export default {
  title: "shared/ListBox",
  component: ListBox,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [CenteredContentDecorator()],
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

export const TopLeft = Template.bind({});
TopLeft.args = {
  direction: "top left",
  defaultValue: "Listbox",
  items,
  onChange: action("onChange"),
};

export const TopRight = Template.bind({});
TopRight.args = {
  direction: "top right",
  defaultValue: "Listbox",
  items,
  onChange: action("onChange"),
};

export const BottomLeft = Template.bind({});
BottomLeft.args = {
  direction: "bottom left",
  defaultValue: "Listbox",
  items,
  onChange: action("onChange"),
};

export const BottomRight = Template.bind({});
BottomRight.args = {
  direction: "bottom right",
  defaultValue: "Listbox",
  items,
  onChange: action("onChange"),
};
