import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
  Button as ButtonDeprecated,
  ButtonTheme,
} from '@/shared/ui/deprecated/Button';
import { Text as TextDeprecated } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { HStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { getProfileData } from '../../model/selectors/getProfileData/getProfileData';
import { getProfileReadonly } from '../../model/selectors/getProfileReadonly/getProfileReadonly';
import { updateProfileData } from '../../model/services/updateProfileData/updateProfileData';
import { profileActions } from '../../model/slice/profileSlice';

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo(
  function EditableProfileCardHeader(props: EditableProfileCardHeaderProps) {
    const { className } = props;

    const { t } = useTranslation('profile');
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);
    // could use reselect selector and use authData and profileData inside
    const canEdit = authData?.id === profileData?.id;
    const readonly = useSelector(getProfileReadonly);
    const dispatch = useAppDispatch();

    const onEditClick = useCallback(() => {
      dispatch(profileActions.setReadonly(false));
    }, [dispatch]);

    const onCancelEditClick = useCallback(() => {
      dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSaveClick = useCallback(() => {
      dispatch(updateProfileData());
    }, [dispatch]);

    return (
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card padding="24" max border="partial">
            <HStack
              justify="between"
              max
              className={classNames('', {}, [className])}
            >
              <Text title={t('Profile')} />
              {canEdit && (
                <HStack gap="8">
                  {readonly ? (
                    <Button
                      variant="outline"
                      onClick={onEditClick}
                      data-testid="EditableProfileCardHeader.EditButton"
                    >
                      {t('Edit')}
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={onCancelEditClick}
                        data-testid="EditableProfileCardHeader.CancelButton"
                        color="error"
                      >
                        {t('Cancel')}
                      </Button>

                      <Button
                        variant="outline"
                        onClick={onSaveClick}
                        data-testid="EditableProfileCardHeader.SaveButton"
                        color="success"
                      >
                        {t('Save')}
                      </Button>
                    </>
                  )}
                </HStack>
              )}
            </HStack>
          </Card>
        }
        off={
          <HStack
            justify="between"
            max
            className={classNames('', {}, [className])}
          >
            <TextDeprecated title={t('Profile')} />
            {canEdit && (
              <HStack gap="8">
                {readonly ? (
                  <ButtonDeprecated
                    theme={ButtonTheme.OUTLINE}
                    onClick={onEditClick}
                    data-testid="EditableProfileCardHeader.EditButton"
                  >
                    {t('Edit')}
                  </ButtonDeprecated>
                ) : (
                  <>
                    <ButtonDeprecated
                      theme={ButtonTheme.OUTLINE_RED}
                      onClick={onCancelEditClick}
                      data-testid="EditableProfileCardHeader.CancelButton"
                    >
                      {t('Cancel')}
                    </ButtonDeprecated>

                    <ButtonDeprecated
                      theme={ButtonTheme.OUTLINE}
                      onClick={onSaveClick}
                      data-testid="EditableProfileCardHeader.SaveButton"
                    >
                      {t('Save')}
                    </ButtonDeprecated>
                  </>
                )}
              </HStack>
            )}
          </HStack>
        }
      />
    );
  },
);
