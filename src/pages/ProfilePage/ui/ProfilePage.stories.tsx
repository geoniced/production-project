import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";
import withMock from "storybook-addon-mock";

import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";
import { ThemeDecorator } from "@/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "@/shared/const/theme";

import ProfilePage from "./ProfilePage";
import { Profile } from "../../../entities/Profile";

export default {
  title: "pages/ProfilePage",
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [withMock],
  parameters: {
    mockData: [
      {
        url: `${__API__}/profile-ratings?userId=`,
        method: "GET",
        status: 200,
        response: {
          id: "1",
          rate: 4,
          feedback: "Good profile",
          userId: "1",
          profileId: "1",
        },
        delay: 500,
      },
    ],
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
