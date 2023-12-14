import { ReactNode } from "react";
import { ReducersMapObject } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";

import { StateSchema, StoreProvider } from "@/app/providers/StoreProvider";
// eslint-disable-next-line kashin-fsd-plugin/layer-imports
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import i18nForTests from "@/shared/config/i18n/i18nForTests";
import { Theme } from "@/shared/const/theme";
// eslint-disable-next-line kashin-fsd-plugin/layer-imports
import "@/app/styles/index.scss";

export interface ComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  theme?: Theme;
}

interface TestProviderProps {
  children: ReactNode;
  options?: ComponentRenderOptions;
}

export function TestProvider(props: TestProviderProps) {
  const { children, options = {} } = props;
  const {
    route = "/",
    initialState,
    asyncReducers,
    theme = Theme.LIGHT,
  } = options;

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider initialState={initialState} asyncReducers={asyncReducers}>
        <ThemeProvider initialTheme={theme}>
          <div className="app">
            <I18nextProvider i18n={i18nForTests}>{children}</I18nextProvider>
          </div>
        </ThemeProvider>
      </StoreProvider>
    </MemoryRouter>
  );
}

export function componentRender(
  component: ReactNode,
  options: ComponentRenderOptions = {}
) {
  return render(<TestProvider options={options}>{component}</TestProvider>);
}
