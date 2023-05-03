import { classNames } from "shared/lib/classNames/classNames";
import { memo, MutableRefObject, ReactNode, useRef, UIEvent, useLayoutEffect } from "react";
import { useInfiniteScroll } from "shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUIScrollByPath, uiActions } from "features/UI";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { StateSchema } from "app/providers/StoreProvider";
import { useThrottle } from "shared/lib/hooks/useThrottle/useThrottle";
import cls from "./Page.module.scss";

interface PageProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

const THROTTLE_DELAY_MS = 250;
export const PAGE_ID = "page-id";

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) => getUIScrollByPath(state, pathname));

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  useInfiniteScroll({
    triggerRef,
    wrapperRef,
    callback: onScrollEnd,
  });

  // Лучше использовать useLayoutEffect
  // useInitialEffect(() => {
  //   wrapperRef.current.scrollTop = scrollPosition;
  // });

  useLayoutEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
    // eslint-disable-next-line
  }, []);

  const onScroll = useThrottle((evt: UIEvent<HTMLDivElement>) => {
    dispatch(
      uiActions.setScrollPosition({
        position: evt.currentTarget.scrollTop,
        path: pathname,
      })
    );
  }, THROTTLE_DELAY_MS);

  return (
    <section onScroll={onScroll} ref={wrapperRef} className={classNames(cls.page, {}, [className])} id={PAGE_ID}>
      {children}
      {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
    </section>
  );
});
