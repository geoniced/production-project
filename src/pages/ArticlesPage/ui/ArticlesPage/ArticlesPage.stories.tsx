import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import withMock from "storybook-addon-mock";

import { articles } from "@/shared/config/storybook/mocks/articleList.mock";
import { StoreDecorator } from "@/shared/config/storybook/StoreDecorator/StoreDecorator";

import ArticlesPage from "./ArticlesPage";

export default {
  title: "pages/ArticlesPage/ArticlesPage",
  component: ArticlesPage,
  argTypes: {
    backgroundColor: { control: "color" },
  },
  decorators: [withMock, StoreDecorator({})],
  parameters: {
    mockData: [
      {
        url: `${__API__}/articles?_expand=user&_limit=9&_page=2&_sort=createdAt&_order=asc&q= `,
        method: "GET",
        status: 200,
        response: articles,
      },
    ],
  },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => (
  <ArticlesPage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
