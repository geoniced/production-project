import { classNames } from "shared/lib/classNames/classNames";
import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { getUserAuthData } from "entities/User";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { HStack } from "shared/ui/Stack";
import { Text } from "shared/ui/Text/Text";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { getProfileData } from "../../model/selectors/getProfileData/getProfileData";
import { getProfileReadonly } from "../../model/selectors/getProfileReadonly/getProfileReadonly";
import { profileActions } from "../../model/slice/profileSlice";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";

interface EditableProfileCardHeaderProps {
  className?: string;
}

export const EditableProfileCardHeader = memo(
  (props: EditableProfileCardHeaderProps) => {
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
                <Button
                  theme={ButtonTheme.OUTLINE_RED}
                  onClick={onCancelEditClick}
                >
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
  }
);
