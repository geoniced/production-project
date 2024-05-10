import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { getVStack, HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';
import cls from './ProfileCardRedesigned.module.scss';

export const ProfileCardRedesignedError = () => {
  const { t } = useTranslation('profile');
  return (
    <HStack
      justify="center"
      max
      className={classNames(cls.profileCard, {}, [cls.error])}
    >
      <Text
        variant="error"
        title={t('Error while loading profile')}
        text={t('Try to reload the page')}
        align="center"
      />
    </HStack>
  );
};

export const ProfileCardRedesignedSkeleton = () => {
  return (
    <Card max padding="24" className={getVStack({ gap: '32' })}>
      <HStack justify="center" max>
        <Skeleton borderRadius="100%" width="128px" height="128px" />
      </HStack>
      <HStack gap="32" max>
        <VStack gap="16" max>
          <Skeleton width="100%" height="38px" />
          <Skeleton width="100%" height="38px" />
          <Skeleton width="100%" height="38px" />
          <Skeleton width="100%" height="38px" />
        </VStack>

        <VStack gap="16" max>
          <Skeleton width="100%" height="38px" />
          <Skeleton width="100%" height="38px" />
          <Skeleton width="100%" height="38px" />
          <Skeleton width="100%" height="38px" />
        </VStack>
      </HStack>
    </Card>
  );
};

export const ProfileCardRedesigned = memo((props: ProfileCardProps) => {
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

  const mods: Mods = {};

  if (isLoading) {
    return <ProfileCardRedesignedSkeleton />;
  }

  if (error) {
    return <ProfileCardRedesignedError />;
  }

  return (
    <Card
      border="partial"
      max
      padding="24"
      className={classNames(cls.profileCard, mods, [
        className,
        getVStack({ gap: '32' }),
      ])}
    >
      {data?.avatar && (
        <HStack justify="center" max className={cls.avatarWrapper}>
          <Avatar size={128} src={data?.avatar} />
        </HStack>
      )}
      <HStack gap="24" max>
        <VStack gap="16" max>
          <Input
            value={data?.firstname}
            label={t('First name')}
            onChange={onFirstnameChange}
            readOnly={readonly}
            data-testid="ProfileCard.FirstName"
          />
          <Input
            value={data?.lastname}
            label={t('Last name')}
            onChange={onLastnameChange}
            readOnly={readonly}
            data-testid="ProfileCard.LastName"
          />
          <Input
            type="tel"
            value={data?.age}
            label={t('Age')}
            onChange={onAgeChange}
            readOnly={readonly}
            onKeyPress={onNumericKeyPress}
            data-testid="ProfileCard.Tel"
          />
          <Input
            value={data?.city}
            label={t('City')}
            onChange={onCityChange}
            readOnly={readonly}
          />
        </VStack>

        <VStack gap="16" max>
          <Input
            value={data?.username}
            label={t('Username')}
            onChange={onUsernameChange}
            readOnly={readonly}
          />
          <Input
            value={data?.avatar}
            label={t('Avatar link')}
            onChange={onAvatarChange}
            readOnly={readonly}
          />
          <CurrencySelect
            value={data?.currency}
            onChange={onCurrencyChange}
            readonly={readonly}
          />
          <CountrySelect
            value={data?.country}
            onChange={onCountryChange}
            readonly={readonly}
          />
        </VStack>
      </HStack>
    </Card>
  );
});
