import { memo, ReactNode, useCallback, useEffect } from "react";

import { classNames, Mods } from "@/shared/lib/classNames/classNames";
import {
  AnimationProvider,
  useAnimationLibs,
} from "@/shared/lib/hooks/AnimationProvider";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";



import { Overlay } from "../Overlay/Overlay";
import { Portal } from "../Portal/Portal";
import cls from "./Drawer.module.scss";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

const height = window.innerHeight - 100;

export const DrawerContent = memo((props: DrawerProps) => {
  const { Spring, Gesture } = useAnimationLibs();
  const { className, onClose, isOpen, children } = props;

  const { closeModal, isClosing } = useModal({
    isOpen,
    onClose,
    animationDelay: 300,
  });

  const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

  const openDrawer = useCallback(() => {
    api.start({ y: 0, immediate: false });
  }, [api]);

  useEffect(() => {
    if (isOpen) {
      openDrawer();
    }
  }, [isOpen, openDrawer]);

  const close = useCallback(
    (velocity = 0) => {
      api.start({
        y: height,
        immediate: false,
        config: {
          ...Spring.config.stiff,
          velocity,
        },
        onResolve: onClose,
      });
    },
    [Spring.config.stiff, api, onClose]
  );

  const bind = Gesture.useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
    }) => {
      if (my < -70) {
        cancel();
      }

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close();
        } else {
          openDrawer();
        }
      } else {
        api.start({ y: my, immediate: true });
      }
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    }
  );

  const display = y.to((py) => (py < height ? "block" : "none"));

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
        <Overlay onClick={close} />
        <Spring.a.div
          className={cls.sheet}
          style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
          {...bind()}
        >
          {children}
        </Spring.a.div>
      </div>
    </Portal>
  );
});

const DrawerAsync = (props: DrawerProps) => {
  const { isLoaded } = useAnimationLibs();

  if (!isLoaded) {
    return null;
  }

  return <DrawerContent {...props} />;
};

export const Drawer = memo((props: DrawerProps) => {
  return (
    <AnimationProvider>
      <DrawerAsync {...props} />
    </AnimationProvider>
  );
});
