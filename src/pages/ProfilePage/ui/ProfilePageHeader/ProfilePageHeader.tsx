import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { Text } from "shared/ui/Text/Text";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { useSelector } from "react-redux";
import { getProfileData, getProfileReadonly, profileActions, updateProfileData } from "entities/Profile";
import { memo, useCallback } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData } from "entities/User";
import { HStack } from "shared/ui/Stack/HStack/HStack";

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = memo((props: ProfilePageHeaderProps) => {
  const { className } = props;

  const { t } = useTranslation("profile");
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
    <HStack justify="between" max className={classNames("", {}, [className])}>
      <Text title={t("Profile")} />
      {canEdit && (
        <HStack gap="8">
          {readonly ? (
            <Button theme={ButtonTheme.OUTLINE} onClick={onEditClick}>
              {t("Edit")}
            </Button>
          ) : (
            <>
              <Button theme={ButtonTheme.OUTLINE_RED} onClick={onCancelEditClick}>
                {t("Cancel")}
              </Button>

              <Button theme={ButtonTheme.OUTLINE} onClick={onSaveClick}>
                {t("Save")}
              </Button>
            </>
          )}
        </HStack>
      )}
    </HStack>
  );
});
