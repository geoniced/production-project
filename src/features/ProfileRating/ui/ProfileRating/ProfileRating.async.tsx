import { FC, lazy, Suspense } from "react";

import { Skeleton } from "@/shared/ui/Skeleton";

import { ProfileRatingProps } from "./ProfileRating";

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
