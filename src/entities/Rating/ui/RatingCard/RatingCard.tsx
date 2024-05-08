import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ToggleFeatures } from '@/shared/lib/features';

import { RatingCardDeprecated } from './RatingCardDeprecated';
import { RatingCardRedesigned } from './RatingCardRedesigned';

export interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    onAccept,
    onCancel,
    hasFeedback,
    feedbackTitle,
    title,
    rate = 0,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState('');

  const onStarsSelect = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);

      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept],
  );

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandler = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const commonProps = {
    title,
    feedback,
    onFeedbackChange: setFeedback,
    starsCount,
    onStarsSelect,
    isModalOpen,
    acceptHandler,
    cancelHandler,
  };

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={<RatingCardRedesigned {...commonProps} />}
      off={<RatingCardDeprecated {...commonProps} />}
    />
  );
});
