import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { saveJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useIsMobile } from '@/shared/lib/hooks/useIsMobile/useIsMobile';
import { Drawer } from '@/shared/ui/Drawer';
import { Modal } from '@/shared/ui/Modal';
import { Text } from '@/shared/ui/Text';

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const { isArticlesPageWasVisited } = useJsonSettings();

  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isArticlesPageWasVisited) {
      setIsOpen(true);
      dispatch(saveJsonSettings({ isArticlesPageWasVisited: true }));
    }
  }, [dispatch, isArticlesPageWasVisited]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const text = useMemo(
    () => (
      <Text
        title={t('Welcome to the articles page')}
        text={t('Here you can search and look for articles on various topics')}
      />
    ),
    [t],
  );

  if (isMobile) {
    return (
      <Drawer isOpen={isOpen} onClose={onClose}>
        {text}
      </Drawer>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  );
});
