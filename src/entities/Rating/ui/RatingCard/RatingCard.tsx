import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

import { useIsMobile } from "@/shared/lib/hooks/useIsMobile/useIsMobile";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Drawer } from "@/shared/ui/Drawer";
import { Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Modal";
import { HStack, VStack } from "@/shared/ui/Stack";
import { StarRating } from "@/shared/ui/StarRating";
import { Text } from "@/shared/ui/Text";

interface RatingCardProps {
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
  const [feedback, setFeedback] = useState("");

  const onStarsSelect = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);

      if (hasFeedback) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedback, onAccept]
  );

  const acceptHandler = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);

  const cancelHandler = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);

  const isMobile = useIsMobile();
  const modalContent = (
    <>
      <Text title={feedbackTitle} />
      <Input
        value={feedback}
        onChange={setFeedback}
        placeholder={t("Your review")}
        autoFocus
      />
    </>
  );

  return (
    <Card className={className} max>
      <VStack align="center" gap="8" max>
        <Text title={starsCount ? t("Thanks for review!") : title} />
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
              theme={ButtonTheme.OUTLINE}
              onClick={acceptHandler}
              size={ButtonSize.L}
              fullWidth
            >
              {t("Submit")}
            </Button>
          </VStack>
        </Drawer>
      )}
      {!isMobile && (
        <Modal isOpen={isModalOpen}>
          <VStack max gap="32">
            {modalContent}

            <HStack max gap="8" justify="end">
              <Button theme={ButtonTheme.OUTLINE_RED} onClick={cancelHandler}>
                {t("Close")}
              </Button>
              <Button theme={ButtonTheme.OUTLINE} onClick={acceptHandler}>
                {t("Submit")}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      )}
    </Card>
  );
});
