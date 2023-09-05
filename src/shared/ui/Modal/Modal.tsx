import { classNames, Mods } from "shared/lib/classNames/classNames";
import React, {
  MutableRefObject,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Overlay } from "../Overlay/Overlay";
import { Portal } from "../Portal/Portal";
import cls from "./Modal.module.scss";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  // lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Modal = (props: ModalProps) => {
  const {
    className,
    children,
    isOpen,
    onClose,
    // lazy,
  } = props;

  const [isClosing, setIsClosing] = useState(false);
  // const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, ANIMATION_DELAY);
    }
  }, [onClose]);

  const onOverlayClick = useCallback(() => {
    closeHandler();
  }, [closeHandler]);

  const onKeyDown = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === "Escape") {
        closeHandler();
      }
    },
    [closeHandler]
  );

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  // if (!isOpen) return null;
  // if (lazy && !isMounted) {
  //   return null;
  // }

  if (!isOpen) {
    return null;
  }

  return (
    <Portal>
      <div className={classNames(cls.modal, mods, [className])}>
        <Overlay onClick={onOverlayClick} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
