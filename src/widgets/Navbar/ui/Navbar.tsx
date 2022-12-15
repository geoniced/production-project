import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const onToggleModal = useCallback(() => {
    setIsAuthModalOpen((prev) => !prev);
  }, []);

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <Button onClick={onToggleModal} theme={ButtonTheme.CLEAR_INVERTED} className={cls.links}>
        {t('Login')}
      </Button>

      <Modal isOpen={isAuthModalOpen} onClose={onToggleModal}>
        {/* eslint-disable-next-line */}
        {t('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae corporis deserunt eius eligendi exercitationem facere id impedit ipsam officiis quia?')}
      </Modal>
    </div>
  );
};
