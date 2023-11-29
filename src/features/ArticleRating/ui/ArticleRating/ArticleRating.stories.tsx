import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

import ArticleRating from "./ArticleRating";

export default {
  title: "features/ArticleRating",
  component: ArticleRating,
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
  ],
} as ComponentMeta<typeof ArticleRating>;

const Template: ComponentStory<typeof ArticleRating> = (args) => (
  <ArticleRating {...args} />
);

const postReviewMock = {
  url: `${__API__}/article-ratings`,
  method: "POST",
  status: 200,
  response: null,
  delay: 500,
};

export const Normal = Template.bind({});
Normal.args = {
  articleId: "1",
};
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/article-ratings?userId=1&articleId=1`,
      method: "GET",
      status: 200,
      response: [],
      delay: 500,
    },
    postReviewMock,
  ],
};

export const HasReview = Template.bind({});
HasReview.args = {
  articleId: "1",
};
HasReview.parameters = {
  mockData: [
    {
      url: `${__API__}/article-ratings?userId=1&articleId=1`,
      method: "GET",
      status: 200,
      response: [
        {
          articleId: 1,
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
