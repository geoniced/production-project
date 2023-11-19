import { MutableRefObject, useCallback, useEffect, useRef } from "react";

/**
 * Хук позволяющий отменять предыдущий вызов функции пока не истечет delay
 * @param callback
 * @param delay - задержка в мс
 */
export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  const timeoutRef = useRef() as MutableRefObject<
    ReturnType<typeof setTimeout>
  >;

  useEffect(
    () => () => {
      clearTimeout(timeoutRef.current);
    },
    []
  );

  return useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}
