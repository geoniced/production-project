import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Input } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import { Text, TextAlign, TextTheme } from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import cls from './ProfileCardDeprecated.module.scss';

export const ProfileCardDeprecated = memo((props: ProfileCardProps) => {
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

  const { t } = useTranslation('profile');

  const onNumericKeyPress = useCallback(
    (evt: React.KeyboardEvent<HTMLInputElement>) => {
      if (/\D/.test(evt.key)) {
        evt.preventDefault();
      }
    },
    [],
  );

  const mods: Mods = {
    [cls.editing]: !readonly,
  };

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
          title={t('Error while loading profile')}
          text={t('Try to reload the page')}
          align={TextAlign.CENTER}
        />
      </HStack>
    );
  }

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
        placeholder={t('Your first name')}
        className={cls.input}
        onChange={onFirstnameChange}
        readOnly={readonly}
        data-testid="ProfileCard.FirstName"
      />
      <Input
        value={data?.lastname}
        placeholder={t('Your last name')}
        className={cls.input}
        onChange={onLastnameChange}
        readOnly={readonly}
        data-testid="ProfileCard.LastName"
      />
      <Input
        type="tel"
        value={data?.age}
        placeholder={t('Your age')}
        className={cls.input}
        onChange={onAgeChange}
        readOnly={readonly}
        onKeyPress={onNumericKeyPress}
        data-testid="ProfileCard.Tel"
      />
      <Input
        value={data?.city}
        placeholder={t('City')}
        className={cls.input}
        onChange={onCityChange}
        readOnly={readonly}
      />
      <Input
        value={data?.username}
        placeholder={t('Enter username')}
        className={cls.input}
        onChange={onUsernameChange}
        readOnly={readonly}
      />
      <Input
        value={data?.avatar}
        placeholder={t('Enter avatar link')}
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
});
