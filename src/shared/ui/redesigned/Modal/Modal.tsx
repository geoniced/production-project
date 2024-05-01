import React, { ReactNode, useCallback } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { useModal } from '@/shared/lib/hooks/useModal/useModal';

import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  // lazy?: boolean;
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
    // lazy,
  } = props;

  const { closeModal, isClosing } = useModal({
    isOpen,
    onClose,
    animationDelay: 300,
  });

  const onOverlayClick = useCallback(() => {
    closeModal();
  }, [closeModal]);

  // if (!isOpen) return null;
  // if (lazy && !isMounted) {
  //   return null;
  // }

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  if (!isOpen) {
    return null;
  }

  return (
    <Portal element={document.getElementById('app') ?? document.body}>
      <div
        className={classNames(cls.modal, mods, [
          className,
          toggleFeatures({
            name: 'isAppRedesigned',
            on: () => cls.modalNew,
            off: () => cls.modalOld,
          }),
        ])}
      >
        <Overlay onClick={onOverlayClick} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
