import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { getFeatureFlag, updateFeatureFlag } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import { ListBox } from '@/shared/ui/redesigned/Popups';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface UiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
  const { className } = props;
  const { t } = useTranslation();

  const isAppRedesigned = getFeatureFlag('isAppRedesigned');
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const forceUpdate = useForceUpdate();

  const [isLoading, setIsLoading] = useState(false);

  const items = [
    {
      content: t('New'),
      value: 'new',
    },
    {
      content: t('Old'),
      value: 'old',
    },
  ];

  const onChange = async (value: string) => {
    if (!authData?.id) return;

    setIsLoading(true);

    await dispatch(
      updateFeatureFlag({
        userId: authData.id,
        features: {
          isAppRedesigned: value === 'new',
        },
      }),
    ).unwrap();

    setIsLoading(false);
    forceUpdate();
  };

  return (
    <HStack gap="8">
      <Text text={t('Interface variant')} />

      {isLoading ? (
        <Skeleton width={115} height={32} borderRadius="34px" />
      ) : (
        <ListBox
          items={items}
          value={isAppRedesigned ? 'new' : 'old'}
          onChange={onChange}
          className={className}
        />
      )}
    </HStack>
  );
});
