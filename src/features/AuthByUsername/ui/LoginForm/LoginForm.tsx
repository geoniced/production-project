import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  ReducersMap,
  useDynamicModuleLoader,
} from '@/shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, TextTheme } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersMap = {
  loginForm: loginReducer,
};

const dynamicModuleLoaderProps = {
  reducers: initialReducers,
  removeAfterUnmount: true,
};

const LoginForm = memo(function LoginForm(props: LoginFormProps) {
  const { className, onSuccess } = props;

  useDynamicModuleLoader(dynamicModuleLoaderProps);

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const username = useSelector(getLoginUsername);
  const password = useSelector(getLoginPassword);
  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginIsLoading);

  const onUsernameChange = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onPasswordChange = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));

    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [dispatch, onSuccess, password, username]);

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <VStack gap="16" className={classNames(cls.loginForm, {}, [className])}>
          <Text className={cls.formTitle} title={t('Authorization')} />
          {error && (
            <Text
              className={cls.formError}
              text={t('Wrong username or password')}
              variant="error"
            />
          )}
          <Input
            autoFocus
            placeholder={t('Enter username')}
            type="text"
            className={cls.input}
            onChange={onUsernameChange}
            value={username}
          />
          <Input
            placeholder={t('Enter password')}
            type="text"
            className={cls.input}
            onChange={onPasswordChange}
            value={password}
          />
          <Button
            variant="outline"
            className={cls.loginBtn}
            onClick={onLoginClick}
            disabled={isLoading}
          >
            {t('Login')}
          </Button>
        </VStack>
      }
      off={
        <div className={classNames(cls.loginForm, {}, [className])}>
          <TextDeprecated
            className={cls.formTitle}
            title={t('Authorization')}
          />
          {error && (
            <TextDeprecated
              className={cls.formError}
              text={t('Wrong username or password')}
              theme={TextTheme.ERROR}
            />
          )}
          <InputDeprecated
            autoFocus
            placeholder={t('Enter username')}
            type="text"
            className={cls.input}
            onChange={onUsernameChange}
            value={username}
          />
          <InputDeprecated
            placeholder={t('Enter password')}
            type="text"
            className={cls.input}
            onChange={onPasswordChange}
            value={password}
          />
          <ButtonDeprecated
            theme={ButtonTheme.OUTLINE}
            className={cls.loginBtn}
            onClick={onLoginClick}
            disabled={isLoading}
          >
            {t('Login')}
          </ButtonDeprecated>
        </div>
      }
    />
  );
});

export default LoginForm;
