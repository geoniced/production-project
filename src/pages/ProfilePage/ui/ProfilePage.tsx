import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo, useEffect } from 'react';
import {
  DynamicModuleLoaderProps,
  ReducersMap,
  useDynamicModuleLoader,
} from 'shared/lib/hooks/useDynamicModuleLoader/useDynamicModuleLoader';
import { fetchProfileData, ProfileCard, profileReducer } from 'entities/Profile';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

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

  const { t } = useTranslation();
  useDynamicModuleLoader(dynamicModuleLoaderProps);

  useEffect(() => {
    dispatch(fetchProfileData());
  }, [dispatch]);

  return (
    <div className={classNames('', {}, [className])}>
      <ProfileCard />
    </div>
  );
});

export default ProfilePage;
