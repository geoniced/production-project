import React from "react";

import { Story } from "@storybook/react";


export const CenteredContentDecorator = () => (StoryComponent: Story) =>
  (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <StoryComponent />
    </div>
  );
