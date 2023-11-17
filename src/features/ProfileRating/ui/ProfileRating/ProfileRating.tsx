import { useTranslation } from "react-i18next";
import { memo, useCallback } from "react";
import { useSelector } from "react-redux";
import { RatingCard } from "@/entities/Rating";
import {
  useGetProfileRating,
  useRateProfile,
} from "../../api/profileRatingApi";
import { getUserAuthData } from "@/entities/User";
import { Skeleton } from "@/shared/ui/Skeleton/Skeleton";

export interface ProfileRatingProps {
  className?: string;
  profileId: string;
}

const ProfileRating = memo((props: ProfileRatingProps) => {
  const { className, profileId } = props;
  const userData = useSelector(getUserAuthData);
  const { data, isLoading } = useGetProfileRating({
    profileId,
    userId: userData?.id ?? "",
  });
  const [rateProfileMutation] = useRateProfile();

  const authData = useSelector(getUserAuthData);
  const isCurrentUserProfile = authData?.id === profileId;

  const { t } = useTranslation();

  const handleProfileRating = useCallback(
    (starsCount: number, feedback?: string) => {
      try {
        rateProfileMutation({
          userId: userData?.id ?? "",
          rate: starsCount,
          profileId,
          feedback,
        });
      } catch (err) {
        // handle error
        console.log(err);
      }
    },
    [profileId, rateProfileMutation, userData?.id]
  );

  const onAccept = useCallback(
    (starsCount: number, feedback?: string) => {
      handleProfileRating(starsCount, feedback);
    },
    [handleProfileRating]
  );

  const onCancel = useCallback(
    (starsCount: number) => {
      handleProfileRating(starsCount);
    },
    [handleProfileRating]
  );

  if (isCurrentUserProfile) {
    return null;
  }

  if (isLoading) {
    return <Skeleton width="100%" height={120} />;
  }

  const rating = data?.[0];

  return (
    <RatingCard
      onAccept={onAccept}
      onCancel={onCancel}
      rate={rating?.rate}
      className={className}
      title={t("Rate this profile")}
      feedbackTitle={t("Leave your feedback of this profile")}
      hasFeedback
    />
  );
});

export default ProfileRating;
