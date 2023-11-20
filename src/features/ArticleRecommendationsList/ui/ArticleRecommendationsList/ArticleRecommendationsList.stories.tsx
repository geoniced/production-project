import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import withMock from "storybook-addon-mock";

import { Article } from "@/entities/Article";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

import { ArticleRecommendationsList } from "./ArticleRecommendationsList";

export default {
  title: "features/ArticleRecommendationsList",
  component: ArticleRecommendationsList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [withMock],
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = (args) => (
  <ArticleRecommendationsList {...args} />
);

const article: Article = {
  id: "1",
  img: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
  createdAt: "",
  views: 123,
  user: {
    id: "1",
    username: "Ivan",
    avatar: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
  },
  blocks: [],
  type: [],
  title: "Article",
  subtitle: "Article subtitle",
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({})];
Normal.parameters = {
  mockData: [
    {
      url: `${__API__}/articles?_limit=3`,
      method: "GET",
      status: 200,
      response: [
        { ...article, id: "1" },
        { ...article, id: "2" },
        { ...article, id: "3" },
      ],
    },
  ],
};
