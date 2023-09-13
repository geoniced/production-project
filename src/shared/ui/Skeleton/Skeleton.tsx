import { CSSProperties, memo, useMemo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import cls from "./Skeleton.module.scss";

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  borderRadius?: string;
}

export const Skeleton = memo(function Skeleton(props: SkeletonProps) {
  const { className, height, width, borderRadius } = props;

  const styles: CSSProperties = useMemo(
    () => ({
      height,
      width,
      borderRadius,
    }),
    [borderRadius, height, width]
  );

  return (
    <div className={classNames(cls.skeleton, {}, [className])} style={styles} />
  );
});
