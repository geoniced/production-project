import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { ValidateProfileError } from "../../consts/consts";
import { validateProfileData } from "./validateProfileData";

const data = {
  username: "admin",
  age: 22,
  country: Country.Kyrgyzstan,
  lastname: "Pupkin",
  firstname: "Vasya",
  city: "Osh",
  currency: Currency.EUR,
};

describe("validateProfileData.test", () => {
  test("success", async () => {
    const result = validateProfileData(data);

    expect(result).toEqual([]);
  });

  test("incorrect first and last name", async () => {
    const result = validateProfileData({
      ...data,
      firstname: "",
      lastname: "",
    });

    expect(result).toEqual([ValidateProfileError.INCORRECT_USER_DATA]);
  });

  test("incorrect age", async () => {
    const result = validateProfileData({ ...data, age: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  test("incorrect age: out of range", async () => {
    const result = validateProfileData({ ...data, age: 4 });

    expect(result).toEqual([ValidateProfileError.INCORRECT_AGE]);
  });

  test("incorrect country", async () => {
    const result = validateProfileData({ ...data, country: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_COUNTRY]);
  });

  test("incorrect city", async () => {
    const result = validateProfileData({ ...data, city: undefined });

    expect(result).toEqual([ValidateProfileError.INCORRECT_CITY]);
  });

  test("incorrect all fields", async () => {
    const result = validateProfileData({});

    expect(result).toEqual([
      ValidateProfileError.INCORRECT_USER_DATA,
      ValidateProfileError.INCORRECT_AGE,
      ValidateProfileError.INCORRECT_CITY,
      ValidateProfileError.INCORRECT_COUNTRY,
    ]);
  });

  test("no data passed", async () => {
    const result = validateProfileData();

    expect(result).toEqual([ValidateProfileError.NO_DATA]);
  });
});
