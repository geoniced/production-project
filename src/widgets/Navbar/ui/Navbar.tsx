import React, { useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const onCloseModal = useCallback(() => {
    setIsAuthModalOpen(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsAuthModalOpen(true);
  }, []);

  return (
    <div className={classNames(cls.navbar, {}, [className])}>
      <Button onClick={onOpenModal} theme={ButtonTheme.CLEAR_INVERTED} className={cls.links}>
        {t('Login')}
      </Button>

      <LoginModal
        isOpen={isAuthModalOpen}
        onClose={onCloseModal}
      />
    </div>
  );
};
