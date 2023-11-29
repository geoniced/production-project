import { userEvent } from "@storybook/testing-library";
import { screen } from "@testing-library/react";

import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";

import { Counter } from "./Counter";

describe("Counter", () => {
  test("Test render", () => {
    componentRender(<Counter />, {
      initialState: {
        counter: { value: 10 },
      },
    });
    expect(screen.getByTestId("value-title")).toHaveTextContent("10");
  });

  test("Increment", async () => {
    componentRender(<Counter />, {
      initialState: {
        counter: { value: 10 },
      },
    });

    await userEvent.click(screen.getByTestId("increment-btn"));

    expect(screen.getByTestId("value-title")).toHaveTextContent("11");
  });

  test("Decrement", async () => {
    componentRender(<Counter />, {
      initialState: {
        counter: { value: 10 },
      },
    });

    await userEvent.click(screen.getByTestId("decrement-btn"));

    expect(screen.getByTestId("value-title")).toHaveTextContent("9");
  });
});
