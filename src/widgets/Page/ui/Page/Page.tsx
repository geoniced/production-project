import {
  memo,
  MutableRefObject,
  ReactNode,
  useRef,
  UIEvent,
  useLayoutEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/StoreProvider';
import { getUIScrollByPath, uiActions } from '@/features/UI';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll';
import { useThrottle } from '@/shared/lib/hooks/useThrottle/useThrottle';
import { TestProps } from '@/shared/types/tests';

import cls from './Page.module.scss';

interface PageProps extends TestProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

const THROTTLE_DELAY_MS = 250;
export const PAGE_ID = 'page-id';

export const Page = memo(function Page(props: PageProps) {
  const { className, children, onScrollEnd } = props;

  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) =>
    getUIScrollByPath(state, pathname),
  );

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
      }),
    );
  }, THROTTLE_DELAY_MS);

  const pageClass = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => cls.pageRedesigned,
    off: () => cls.page,
  });

  return (
    <section
      onScroll={onScroll}
      ref={wrapperRef}
      className={classNames(pageClass, {}, [className])}
      id={PAGE_ID}
      data-testid={props['data-testid'] ?? 'Page'}
    >
      {children}
      {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
    </section>
  );
});
