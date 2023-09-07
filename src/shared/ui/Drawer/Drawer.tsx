import { classNames, Mods } from "shared/lib/classNames/classNames";
import { memo, ReactNode } from "react";
import { useTheme } from "app/providers/ThemeProvider";
import { useModal } from "shared/lib/hooks/useModal/useModal";
import { Portal } from "../Portal/Portal";
import { Overlay } from "../Overlay/Overlay";
import cls from "./Drawer.module.scss";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
  const { className, onClose, isOpen, children } = props;

  const { closeModal, isClosing } = useModal({
    isOpen,
    onClose,
    animationDelay: 300,
  });

  const { theme } = useTheme();

  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };

  return (
    <Portal>
      <div
        className={classNames(cls.drawer, mods, [
          className,
          theme,
          "app_drawer",
        ])}
      >
        <Overlay onClick={closeModal} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
});
