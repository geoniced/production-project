import { Story } from "@storybook/react";
// eslint-disable-next-line kashin-fsd-plugin/layer-imports
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { Theme } from "@/shared/const/theme";

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
  (
    <ThemeProvider initialTheme={theme}>
      <div className="app">
        <StoryComponent />
      </div>
    </ThemeProvider>
  );
