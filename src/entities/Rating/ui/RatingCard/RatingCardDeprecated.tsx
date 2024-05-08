import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useIsMobile } from '@/shared/lib/hooks/useIsMobile/useIsMobile';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Card } from '@/shared/ui/deprecated/Card';
import { Input } from '@/shared/ui/deprecated/Input';
import { StarRating } from '@/shared/ui/deprecated/StarRating';
import { Text } from '@/shared/ui/deprecated/Text';
import { Drawer } from '@/shared/ui/redesigned/Drawer';
import { Modal } from '@/shared/ui/redesigned/Modal';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { RatingCardProps } from './RatingCard';

type RatingCardDeprecatedProps = Pick<
  RatingCardProps,
  'className' | 'title' | 'feedbackTitle'
> & {
  feedback: string;
  onFeedbackChange: (feedback: string) => void;
  starsCount: number;
  onStarsSelect: (starsCount: number) => void;
  isModalOpen: boolean;
  acceptHandler: () => void;
  cancelHandler: () => void;
};

export const RatingCardDeprecated: FC<RatingCardDeprecatedProps> = ({
  className,
  feedbackTitle,
  title,

  feedback,
  onFeedbackChange,
  starsCount,
  onStarsSelect,
  isModalOpen,
  acceptHandler,
  cancelHandler,
}) => {
  const { t } = useTranslation();

  const isMobile = useIsMobile();
  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input
        value={feedback}
        onChange={onFeedbackChange}
        placeholder={t('Your review')}
        autoFocus
        data-testid="RatingCard.Input"
      />
    </>
  );

  return (
    <Card className={className} max data-testid="RatingCard">
      <VStack align="center" gap="8" max>
        <Text title={starsCount ? t('Thanks for review!') : title} />
        <StarRating
          selectedStars={starsCount}
          size={30}
          onSelect={onStarsSelect}
        />
      </VStack>

      {isMobile && (
        <Drawer isOpen={isModalOpen} onClose={cancelHandler}>
          <VStack max gap="32">
            {modalContent}

            <Button
              data-testid="RatingCard.Send"
              theme={ButtonTheme.OUTLINE}
              onClick={acceptHandler}
              size={ButtonSize.L}
              fullWidth
            >
              {t('Submit')}
            </Button>
          </VStack>
        </Drawer>
      )}
      {!isMobile && (
        <Modal isOpen={isModalOpen}>
          <VStack max gap="32">
            {modalContent}

            <HStack max gap="8" justify="end">
              <Button
                data-testid="RatingCard.Close"
                theme={ButtonTheme.OUTLINE_RED}
                onClick={cancelHandler}
              >
                {t('Close')}
              </Button>
              <Button
                data-testid="RatingCard.Send"
                theme={ButtonTheme.OUTLINE}
                onClick={acceptHandler}
              >
                {t('Submit')}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      )}
    </Card>
  );
};
