import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Article, ArticleView } from "../../model/types/article";
import { ArticleListItemSkeleton } from "./ArticleListItemSkeleton";

export default {
  title: "entities/Article/ArticleListItemSkeleton",
  component: ArticleListItemSkeleton,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof ArticleListItemSkeleton>;

const Template: ComponentStory<typeof ArticleListItemSkeleton> = (args) => (
  <ArticleListItemSkeleton {...args} />
);

export const Tile = Template.bind({});
Tile.args = {
  view: ArticleView.TILE,
};

export const List = Template.bind({});
List.args = {
  view: ArticleView.LIST,
};
