import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import ProfilePage from "./ProfilePage";
import { Profile } from "../../../entities/Profile";
import { Theme } from "@/shared/const/theme";

export default {
  title: "pages/ProfilePage",
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage />;

const data: Profile = {
  username: "admin",
  age: 22,
  country: Country.Kyrgyzstan,
  lastname: "Pupkin",
  firstname: "Vasya",
  city: "Osh",
  currency: Currency.EUR,
  avatar:
    "https://digi.kg/_next/image?url=%2Fimages%2Fteam_avatars%2Fivan.jpg&w=384&q=75C",
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
  StoreDecorator({
    profile: {
      form: data,
    },
  }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  ThemeDecorator(Theme.DARK),
  StoreDecorator({
    profile: {
      form: data,
    },
  }),
];
