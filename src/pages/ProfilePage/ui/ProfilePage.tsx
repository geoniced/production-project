import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import {
  DynamicModuleLoaderProps,
  ReducersMap,
  useDynamicModuleLoader,
} from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import {
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileReadonly,
  profileActions,
  ProfileCard,
  profileReducer,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

interface ProfilePageProps {
  className?: string;
}

const reducers: ReducersMap = {
  profile: profileReducer,
};

const dynamicModuleLoaderProps: DynamicModuleLoaderProps = {
  reducers,
  removeAfterUnmount: true,
};

const ProfilePage = memo((props: ProfilePageProps) => {
  const {
    className,
  } = props;

  const dispatch = useAppDispatch();

  const formData = useSelector(getProfileForm);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);
  const readonly = useSelector(getProfileReadonly);

  const { t } = useTranslation();
  useDynamicModuleLoader(dynamicModuleLoaderProps);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  const onFirstnameChange = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ firstname: value || '' }));
  }, [dispatch]);

  const onLastnameChange = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ lastname: value || '' }));
  }, [dispatch]);

  const onAgeChange = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
  }, [dispatch]);

  const onCityChange = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ city: value || '' }));
  }, [dispatch]);

  const onUsernameChange = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ username: value || '' }));
  }, [dispatch]);

  const onAvatarChange = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ avatar: value || '' }));
  }, [dispatch]);

  const onCurrencyChange = useCallback((currency: Currency) => {
    dispatch(profileActions.updateProfile({ currency }));
  }, [dispatch]);

  const onCountryChange = useCallback((country: Country) => {
    dispatch(profileActions.updateProfile({ country }));
  }, [dispatch]);

  return (
    <div className={classNames('', {}, [className])}>
      <ProfilePageHeader />
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
    </div>
  );
});

export default ProfilePage;
