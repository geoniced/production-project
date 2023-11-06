import { useTranslation } from "react-i18next";
import { memo, useCallback, useState } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";
import { Card } from "@/shared/ui/Card/Card";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text } from "@/shared/ui/Text/Text";
import { StarRating } from "@/shared/ui/StarRating/StarRating";
import { Modal } from "@/shared/ui/Modal/Modal";
import { Input } from "@/shared/ui/Input/Input";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import { useIsMobile } from "@/shared/lib/hooks/useIsMobile/useIsMobile";
import { Drawer } from "@/shared/ui/Drawer/Drawer";

interface RatingCardProps {
  className?: string;
  title?: string;
  feedbackTitle?: string;
  hasFeedback?: boolean;
  onCancel?: (starsCount: number) => void;
  onAccept?: (starsCount: number, feedback?: string) => void;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const { className, onAccept, onCancel, hasFeedback, feedbackTitle, title } =
    props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useTranslation();
  const [starsCount, setStarsCount] = useState(0);
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
      />
    </>
  );

  return (
    <Card className={classNames("", {}, [className])}>
      <VStack align="center" gap="8">
        <Text title={title} />
        <StarRating size={40} onSelect={onStarsSelect} />
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
