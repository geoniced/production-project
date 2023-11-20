import { memo, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";


import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { ProfileCard } from "@/entities/Profile";
import { classNames } from "@/shared/lib/classNames/classNames";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  DynamicModuleLoaderProps,
  ReducersMap,
  useDynamicModuleLoader,
} from "@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect/useInitialEffect";
import { VStack } from "@/shared/ui/Stack";
import { Text, TextTheme } from "@/shared/ui/Text";

import { ValidateProfileError } from "../../model/consts/consts";
import { getProfileError } from "../../model/selectors/getProfileError/getProfileError";
import { getProfileForm } from "../../model/selectors/getProfileForm/getProfileForm";
import { getProfileIsLoading } from "../../model/selectors/getProfileIsLoading/getProfileIsLoading";
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { getProfileValidateErrors } from "../../model/selectors/getProfileValidateErrors/getProfileValidateErrors";
import { fetchProfileData } from "../../model/services/fetchProfileData/fetchProfileData";
import { profileActions, profileReducer } from "../../model/slice/profileSlice";
import { EditableProfileCardHeader } from "../EditableProfileCardHeader/EditableProfileCardHeader";

interface EditableProfileCardProps {
  className?: string;
  id?: string;
}
const reducers: ReducersMap = {
  profile: profileReducer,
};

const dynamicModuleLoaderProps: DynamicModuleLoaderProps = {
  reducers,
  removeAfterUnmount: true,
};

export const EditableProfileCard = memo(function EditableProfileCard(
  props: EditableProfileCardProps
) {
  const { className, id } = props;
  const { t } = useTranslation("profile");

  useDynamicModuleLoader(dynamicModuleLoaderProps);

  const dispatch = useAppDispatch();

  const formData = useSelector(getProfileForm);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);
  const readonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getProfileValidateErrors);

  const validateErrorTranslationMap = useMemo(
    () => ({
      [ValidateProfileError.SERVER_ERROR]: t("Server error while saving"),
      [ValidateProfileError.INCORRECT_USER_DATA]: t(
        "First name and last name are required"
      ),
      [ValidateProfileError.INCORRECT_AGE]: t("Incorrect age"),
      [ValidateProfileError.INCORRECT_CITY]: t("Incorrect city"),
      [ValidateProfileError.INCORRECT_COUNTRY]: t("Incorrect country"),
      [ValidateProfileError.NO_DATA]: t("No data"),
    }),
    [t]
  );

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  const onFirstnameChange = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ firstname: value || "" }));
    },
    [dispatch]
  );

  const onLastnameChange = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || "" }));
    },
    [dispatch]
  );

  const onAgeChange = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
    },
    [dispatch]
  );

  const onCityChange = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || "" }));
    },
    [dispatch]
  );

  const onUsernameChange = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || "" }));
    },
    [dispatch]
  );

  const onAvatarChange = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || "" }));
    },
    [dispatch]
  );

  const onCurrencyChange = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency }));
    },
    [dispatch]
  );

  const onCountryChange = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country }));
    },
    [dispatch]
  );

  return (
    <VStack gap="8" max className={classNames("", {}, [className])}>
      <EditableProfileCardHeader />
      {validateErrors?.length &&
        validateErrors.map((err) => (
          <Text
            key={err}
            theme={TextTheme.ERROR}
            text={validateErrorTranslationMap[err]}
            data-testid="EditableProfileCard.Error"
          />
        ))}
      <ProfileCard
        data={formData}
        isLoading={isLoading}
        error={error}
        readonly={readonly}
        onFirstnameChange={onFirstnameChange}
        onLastnameChange={onLastnameChange}
        onAgeChange={onAgeChange}
        onCityChange={onCityChange}
        onUsernameChange={onUsernameChange}
        onAvatarChange={onAvatarChange}
        onCurrencyChange={onCurrencyChange}
        onCountryChange={onCountryChange}
      />
    </VStack>
  );
});
