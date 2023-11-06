import { memo, useState } from "react";
import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import cls from "./StarRating.module.scss";
import { Icon } from "@/shared/ui/Icon/Icon";
import StarIcon from "@/shared/assets/icons/star.svg";

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo((props: StarRatingProps) => {
  const { className, selectedStars = 0, size = 30, onSelect } = props;

  const [currentStarsCount, setCurrentStarsCount] = useState(0);
  const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

  const createHoverHandler = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };

  const createClickHandler = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setIsSelected(true);
    }
  };

  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };

  return (
    <div className={classNames(cls.starRating, {}, [className])}>
      {stars.map((starNumber) => (
        <Icon
          className={classNames(
            cls.starIcon,
            {
              [cls.hovered]: starNumber <= currentStarsCount,
              [cls.selected]: isSelected,
            },
            [cls.default]
          )}
          key={starNumber}
          Svg={StarIcon}
          width={size}
          height={size}
          onClick={createClickHandler(starNumber)}
          onMouseEnter={createHoverHandler(starNumber)}
          onMouseLeave={onLeave}
        />
      ))}
    </div>
  );
});
