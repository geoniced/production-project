import { Story } from "@storybook/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

export const MemoryRouterDecorator = (
  initialEntries = ["/"],
  routePath = "/"
) => {
  console.log({ initialEntries, routePath });
  return (StoryComponent: Story) => (
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route path={routePath} element={<StoryComponent />} />
      </Routes>
    </MemoryRouter>
  );
};
