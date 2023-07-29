import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CenteredContentDecorator } from "shared/config/storybook/CenteredContentDecorator/CenteredContentDecorator";
import { Country } from "../../model/types/country";
import { CountrySelect } from "./CountrySelect";

export default {
  title: "entities/CountrySelect",
  component: CountrySelect,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    to: "/",
  },
  decorators: [CenteredContentDecorator()],
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = (args) => (
  <CountrySelect {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  value: Country.Kyrgyzstan,
};
