import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";

import { Skeleton } from "./Skeleton";

export default {
  title: "shared/Skeleton",
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  width: "100%",
  height: 200,
};

export const Round = Template.bind({});
Round.args = {
  borderRadius: "100%",
  width: "100px",
  height: "100px",
};

export const NormalDark = Template.bind({});
NormalDark.args = {
  width: "100%",
  height: 200,
};
NormalDark.decorators = [ThemeDecorator(Theme.DARK)];

export const RoundDark = Template.bind({});
RoundDark.args = {
  borderRadius: "100%",
  width: "100px",
  height: "100px",
};
RoundDark.decorators = [ThemeDecorator(Theme.DARK)];
