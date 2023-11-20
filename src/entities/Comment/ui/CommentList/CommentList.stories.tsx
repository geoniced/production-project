import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { CommentList } from "./CommentList";

export default {
  title: "entities/Comment/CommentList",
  component: CommentList,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => (
  <CommentList {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  comments: [
    {
      id: "1",
      text: "Hello world",
      user: {
        id: "1",
        username: "Ivan",
        avatar: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
      },
    },
    {
      id: "2",
      text: "Comment 2",
      user: {
        id: "2",
        username: "Admin",
        avatar: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
      },
    },
  ],
};

export const Loading = Template.bind({});
Loading.args = {
  comments: [],
  isLoading: true,
};
