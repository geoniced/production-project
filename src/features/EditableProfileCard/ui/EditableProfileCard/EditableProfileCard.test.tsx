import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { componentRender } from "@/shared/lib/tests/componentRender/componentRender";
import { Profile } from "@/entities/Profile";
import { Currency } from "@/entities/Currency";
import { Country } from "@/entities/Country";
import { $api } from "@/shared/api/api";
import { profileReducer } from "../../model/slice/profileSlice";
import { EditableProfileCard } from "./EditableProfileCard";

const profile: Profile = {
  id: "1",
  firstname: "admin",
  lastname: "admin",
  age: 20,
  currency: Currency.RUB,
  country: Country.Kazakhstan,
  city: "Moscow",
  username: "admin",
};

const options = {
  initialState: {
    profile: {
      readonly: true,
      data: profile,
      form: profile,
    },
    user: {
      authData: { id: "1", username: "admin", avatar: "" },
    },
  },
  asyncReducers: { profile: profileReducer },
};

describe("features/EditableProfileCard", () => {
  test("Readonly mode should be able to toggle for user's profile", async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    );
    expect(
      screen.getByTestId("EditableProfileCardHeader.CancelButton")
    ).toBeInTheDocument();
  });

  test("The form data should reset by clicking Cancel button", async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    );

    await userEvent.clear(screen.getByTestId("ProfileCard.FirstName"));
    await userEvent.clear(screen.getByTestId("ProfileCard.LastName"));

    await userEvent.type(screen.getByTestId("ProfileCard.FirstName"), "user");
    await userEvent.type(screen.getByTestId("ProfileCard.LastName"), "user");

    expect(screen.getByTestId("ProfileCard.FirstName")).toHaveValue("user");
    expect(screen.getByTestId("ProfileCard.LastName")).toHaveValue("user");

    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.CancelButton")
    );

    expect(screen.getByTestId("ProfileCard.FirstName")).toHaveValue("admin");
    expect(screen.getByTestId("ProfileCard.LastName")).toHaveValue("admin");
  });

  test("Should be shown a validation error", async () => {
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    );

    await userEvent.clear(screen.getByTestId("ProfileCard.FirstName"));

    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.SaveButton")
    );

    expect(
      screen.getByTestId("EditableProfileCard.Error.Paragraph")
    ).toBeInTheDocument();
  });

  test("PUT request should be sent when there is no validation errors", async () => {
    const mockPutReq = jest.spyOn($api, "put");
    componentRender(<EditableProfileCard id="1" />, options);
    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.EditButton")
    );

    await userEvent.type(screen.getByTestId("ProfileCard.FirstName"), "user");

    await userEvent.click(
      screen.getByTestId("EditableProfileCardHeader.SaveButton")
    );

    expect(mockPutReq).toHaveBeenCalled();
  });
});
