import { memo, useState } from 'react';

import StarIcon from '@/shared/assets/icons/star.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features';

import { Icon } from '../../redesigned/Icon';
import { HStack } from '../../redesigned/Stack';
import { Icon as IconDeprecated } from '../Icon/Icon';
import cls from './StarRating.module.scss';

interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const StarRating = memo((props: StarRatingProps) => {
  const { className, selectedStars = 0, size = 30, onSelect } = props;

  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
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
    <HStack
      gap="16"
      className={classNames(
        toggleFeatures({
          name: 'isAppRedesigned',
          on: () => cls.starRatingRedesigned,
          off: () => cls.starRating,
        }),
        {},
        [className],
      )}
    >
      {stars.map((starNumber) => {
        const commonProps = {
          className: classNames(
            cls.starIcon,
            {
              [cls.hovered]: starNumber <= currentStarsCount,
              [cls.selected]: isSelected,
            },
            [cls.default],
          ),
          key: starNumber,
          Svg: StarIcon,
          width: size,
          height: size,
          onClick: createClickHandler(starNumber),
          onMouseEnter: createHoverHandler(starNumber),
          onMouseLeave: onLeave,
          'data-testid': `StarRating.${starNumber}`,
          'data-selected': starNumber <= currentStarsCount,
        };

        return (
          <ToggleFeatures
            key={starNumber}
            feature="isAppRedesigned"
            on={<Icon {...commonProps} clickable={!isSelected} />}
            off={<IconDeprecated {...commonProps} />}
          />
        );
      })}
    </HStack>
  );
});
