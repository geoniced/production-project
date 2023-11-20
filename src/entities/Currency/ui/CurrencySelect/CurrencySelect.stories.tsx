import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CenteredContentDecorator } from "@/shared/config/storybook/CenteredContentDecorator/CenteredContentDecorator";

import { CurrencySelect } from "./CurrencySelect";

export default {
  title: "entities/CurrencySelect",
  component: CurrencySelect,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
  decorators: [CenteredContentDecorator()],
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => (
  <CurrencySelect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
