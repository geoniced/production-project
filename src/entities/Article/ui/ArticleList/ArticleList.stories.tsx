import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { articles } from "@/shared/config/storybook/mocks/articleList.mock";

import { ArticleList } from "./ArticleList";
import { ArticleView } from "../../model/consts/articleConsts";

export default {
  title: "entities/Article/ArticleList",
  component: ArticleList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  args: {
    virtualized: false,
  },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => (
  <ArticleList {...args} />
);

export const List = Template.bind({});
List.args = {
  view: ArticleView.LIST,
  articles,
};

export const Tiles = Template.bind({});
Tiles.args = {
  view: ArticleView.TILE,
  articles,
};
