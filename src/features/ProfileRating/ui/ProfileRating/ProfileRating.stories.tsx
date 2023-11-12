import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import withMock from "storybook-addon-mock";
import ProfileRating from "./ProfileRating";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

export default {
  title: "features/ProfileRating",
  component: ProfileRating,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [
    StoreDecorator({
      user: {
        authData: {
          id: "1",
        },
      },
    }),
    withMock,
  ],
} as ComponentMeta<typeof ProfileRating>;

const Template: ComponentStory<typeof ProfileRating> = (args) => (
  <ProfileRating {...args} />
);

const postReviewMock = {
  url: `${__API__}/profile-ratings`,
  method: "POST",
  status: 200,
  response: null,
  delay: 500,
};

export const Normal = Template.bind({});
Normal.args = {
  profileId: "1",
};
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/profile-ratings?userId=1&profileId=1`,
      method: "GET",
      status: 200,
      response: null,
      delay: 500,
    },
    postReviewMock,
  ],
};

export const HasReview = Template.bind({});
HasReview.args = {
  profileId: "1",
};
HasReview.parameters = {
  mockData: [
    {
      url: `${__API__}/profile-ratings?userId=1&profileId=1`,
      method: "GET",
      status: 200,
      response: [
        {
          profileId: 1,
          userId: "1",
          rate: 5,
          feedback: "Five stars",
        },
      ],
      delay: 500,
    },
    postReviewMock,
  ],
};
