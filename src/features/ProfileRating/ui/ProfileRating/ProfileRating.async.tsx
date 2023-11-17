import { FC, lazy, Suspense } from "react";
import { ProfileRatingProps } from "./ProfileRating";
import { Skeleton } from "@/shared/ui/Skeleton";

const ProfileRatingLazy = lazy<FC<ProfileRatingProps>>(
  () => import("./ProfileRating")
);

export const ProfileRatingAsync: FC<ProfileRatingProps> = (props) => {
  return (
    <Suspense fallback={<Skeleton width="100%" height={120} />}>
      <ProfileRatingLazy {...props} />
    </Suspense>
  );
};
