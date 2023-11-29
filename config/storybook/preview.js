import { RouterDecorator } from "../../src/shared/config/storybook/RouterDecorator/RouterDecorator";
import { StyleDecorator } from "../../src/shared/config/storybook/StyleDecorator/StyleDecorator";
import { SuspenseDecorator } from "../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator";
import { ThemeDecorator } from "../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator";
import { Theme } from "../../src/shared/const/theme";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: "fullscreen",
  themes: {
    default: "light",
    list: [
      { name: "light", class: ["app", Theme.LIGHT], color: "#ffffff" },
      { name: "dark", class: ["app", Theme.DARK], color: "#000000" },
      {
        name: "typewriter",
        class: ["app", Theme.TYPEWRITER],
        color: "#7c7c7c",
      },
    ],
  },
};

export const decorators = [
  StyleDecorator,
  ThemeDecorator(Theme.LIGHT),
  RouterDecorator,
  SuspenseDecorator,
];

// addDecorator(StyleDecorator);
// addDecorator(RouterDecorator);
// // Bug: not applying theme from storybook theme addon and instead storybook uses this decorator
// // If you click on the theme icon in header toolbar then it will work
// addDecorator(ThemeDecorator(Theme.LIGHT));
// addDecorator(SuspenseDecorator);
