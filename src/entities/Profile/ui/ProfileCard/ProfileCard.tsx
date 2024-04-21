import React from 'react';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ToggleFeatures } from '@/shared/lib/features';

import { Profile } from '../../model/types/profile';
import { ProfileCardDeprecated } from '../ProfileCardDeprecated/ProfileCardDeprecated';
import { ProfileCardRedesigned } from '../ProfileCardRedesigned/ProfileCardRedesigned';

export interface ProfileCardProps {
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
  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<ProfileCardRedesigned {...props} />}
      off={<ProfileCardDeprecated {...props} />}
    />
  );
};
