import React from "react";

import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CommentCard } from "./CommentCard";

export default {
  title: "entities/Comment/CommentCard",
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => (
  <CommentCard {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  comment: {
    id: "1",
    text: "Hello world",
    user: {
      id: "1",
      username: "Ivan",
      avatar: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
    },
  },
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
