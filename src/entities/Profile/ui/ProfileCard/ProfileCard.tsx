import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { Country, CountrySelect } from "@/entities/Country";
import { Currency, CurrencySelect } from "@/entities/Currency";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import { Avatar } from "@/shared/ui/Avatar";
import { Input } from "@/shared/ui/Input";
import { Loader } from "@/shared/ui/Loader";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text, TextAlign, TextTheme } from "@/shared/ui/Text";

import { Profile } from "../../model/types/profile";
import cls from "./ProfileCard.module.scss";


interface ProfileCardProps {
  className?: string;
  data?: Profile;
  isLoading?: boolean;
  error?: string;
  readonly?: boolean;

  onFirstnameChange?: (value?: string) => void;
  onLastnameChange?: (value?: string) => void;
  onAgeChange?: (value?: string) => void;
  onCityChange?: (value?: string) => void;
  onUsernameChange?: (value?: string) => void;
  onAvatarChange?: (value?: string) => void;
  onCurrencyChange?: (currency: Currency) => void;
  onCountryChange?: (country: Country) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
  const {
    className,
    data,
    isLoading,
    error,
    readonly,
    onFirstnameChange,
    onLastnameChange,
    onAgeChange,
    onCityChange,
    onUsernameChange,
    onAvatarChange,
    onCurrencyChange,
    onCountryChange,
  } = props;

  const { t } = useTranslation("profile");

  const onNumericKeyPress = useCallback(
    (evt: React.KeyboardEvent<HTMLInputElement>) => {
      if (/\D/.test(evt.key)) {
        evt.preventDefault();
      }
    },
    []
  );

  if (isLoading) {
    return (
      <HStack
        justify="center"
        max
        className={classNames(cls.profileCard, {}, [className, cls.loading])}
      >
        <Loader />
      </HStack>
    );
  }

  if (error) {
    return (
      <HStack
        justify="center"
        max
        className={classNames(cls.profileCard, {}, [className, cls.error])}
      >
        <Text
          theme={TextTheme.ERROR}
          title={t("Error while loading profile")}
          text={t("Try to reload the page")}
          align={TextAlign.CENTER}
        />
      </HStack>
    );
  }

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

  return (
    <VStack
      gap="8"
      max
      className={classNames(cls.profileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack justify="center" max className={cls.avatarWrapper}>
          <Avatar src={data?.avatar} />
        </HStack>
      )}
      <Input
        value={data?.firstname}
        placeholder={t("Your first name")}
        className={cls.input}
        onChange={onFirstnameChange}
        readOnly={readonly}
        data-testid="ProfileCard.FirstName"
      />
      <Input
        value={data?.lastname}
        placeholder={t("Your last name")}
        className={cls.input}
        onChange={onLastnameChange}
        readOnly={readonly}
        data-testid="ProfileCard.LastName"
      />
      <Input
        type="tel"
        value={data?.age}
        placeholder={t("Your age")}
        className={cls.input}
        onChange={onAgeChange}
        readOnly={readonly}
        onKeyPress={onNumericKeyPress}
        data-testid="ProfileCard.Tel"
      />
      <Input
        value={data?.city}
        placeholder={t("City")}
        className={cls.input}
        onChange={onCityChange}
        readOnly={readonly}
      />
      <Input
        value={data?.username}
        placeholder={t("Enter username")}
        className={cls.input}
        onChange={onUsernameChange}
        readOnly={readonly}
      />
      <Input
        value={data?.avatar}
        placeholder={t("Enter avatar link")}
        className={cls.input}
        onChange={onAvatarChange}
        readOnly={readonly}
      />
      <CurrencySelect
        className={cls.input}
        value={data?.currency}
        onChange={onCurrencyChange}
        readonly={readonly}
      />
      <CountrySelect
        className={cls.input}
        value={data?.country}
        onChange={onCountryChange}
        readonly={readonly}
      />
    </VStack>
  );
};
