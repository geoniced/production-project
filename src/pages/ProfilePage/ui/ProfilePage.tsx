import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import {
  DynamicModuleLoaderProps,
  ReducersMap,
  useDynamicModuleLoader,
} from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { profileReducer } from 'entities/Profile';

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

  const { t } = useTranslation();
  useDynamicModuleLoader(dynamicModuleLoaderProps);

  return (
    <div className={classNames('', {}, [className])}>
      {t('Profile page')}
    </div>
  );
});

export default ProfilePage;
