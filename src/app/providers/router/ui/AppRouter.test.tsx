import { act, screen } from "@testing-library/react";

import { UserRole } from "@/entities/User";
import {
  getRouteAbout,
  getRouteAdmin,
  getRouteProfile,
} from "@/shared/const/router";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";

import AppRouter from "./AppRouter";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("app/router/AppRouter", () => {
  test("Страница должна отрендериться", async () => {
    componentRender(<AppRouter />, {
      route: getRouteAbout(),
    });

    const page = await screen.findByTestId("AboutPage");

    expect(page).toBeInTheDocument();
  });

  test("Страница не найдена", async () => {
    componentRender(<AppRouter />, {
      route: "/asdasd",
    });

    const page = await screen.findByTestId("NotFoundPage");

    expect(page).toBeInTheDocument();
  });

  test("Редирект неавторизованного пользователя на главную", async () => {
    componentRender(<AppRouter />, {
      route: getRouteProfile("1"),
    });

    const page = await screen.findByTestId("MainPage");

    expect(page).toBeInTheDocument();
  });

  test("Доступ к закрытой странице для авторизованного пользователя", async () => {
    await act(() =>
      componentRender(<AppRouter />, {
        route: getRouteProfile("1"),
        initialState: {
          user: {
            authData: {},
            _initialized: true,
          },
        },
      })
    );

    const page = await screen.findByTestId("ProfilePage");

    expect(page).toBeInTheDocument();
  });

  test("Доступ запрещен (отсутствует роль)", async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: {
          authData: {},
          _initialized: true,
        },
      },
    });

    const page = await screen.findByTestId("ForbiddenPage");

    expect(page).toBeInTheDocument();
  });

  test("Доступ разрешен (присутствует роль)", async () => {
    componentRender(<AppRouter />, {
      route: getRouteAdmin(),
      initialState: {
        user: {
          authData: {
            roles: [UserRole.ADMIN],
          },
          _initialized: true,
        },
      },
    });

    const page = await screen.findByTestId("AdminPanelPage");

    expect(page).toBeInTheDocument();
  });
});
