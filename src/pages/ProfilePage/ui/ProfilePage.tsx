import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import {
  memo, useCallback, useEffect, useMemo,
} from 'react';
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
  getProfileValidateErrors,
  profileActions,
  ProfileCard,
  profileReducer, ValidateProfileError,
} from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Currency } from 'entities/Currency';
import { Country } from 'entities/Country';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect';
import { useParams } from 'react-router-dom';
import { Page } from 'shared/ui/Page/Page';
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

  const { t } = useTranslation('profile');
  const dispatch = useAppDispatch();

  const formData = useSelector(getProfileForm);
  const error = useSelector(getProfileError);
  const isLoading = useSelector(getProfileIsLoading);
  const readonly = useSelector(getProfileReadonly);
  const validateErrors = useSelector(getProfileValidateErrors);
  const { id } = useParams<{id: string}>();

  const validateErrorTranslationMap = useMemo(() => ({
    [ValidateProfileError.SERVER_ERROR]: t('Server error while saving'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('First name and last name are required'),
    [ValidateProfileError.INCORRECT_AGE]: t('Incorrect age'),
    [ValidateProfileError.INCORRECT_CITY]: t('Incorrect city'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Incorrect country'),
    [ValidateProfileError.NO_DATA]: t('No data'),
  }), [t]);

  useDynamicModuleLoader(dynamicModuleLoaderProps);

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

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
    <Page className={classNames('', {}, [className])}>
      <ProfilePageHeader />
      {validateErrors?.length && validateErrors.map((err) => (
        <Text
          key={err}
          theme={TextTheme.ERROR}
          text={validateErrorTranslationMap[err]}
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
    </Page>
  );
});

export default ProfilePage;
