import {
  MutableRefObject, useCallback, useEffect, useRef,
} from 'react';

export function useThrottle(callback: (...args: any[]) => void, delay: number) {
  const throttleRef = useRef(false);
  const timeoutRef = useRef() as MutableRefObject<ReturnType<typeof setTimeout>>;

  useEffect(() => () => {
    clearTimeout(timeoutRef.current);
  }, []);

  return useCallback((...args: any[]) => {
    if (!throttleRef.current) {
      callback(...args);
      throttleRef.current = true;

      timeoutRef.current = setTimeout(() => {
        throttleRef.current = false;
      }, delay);
    }
  }, [callback, delay]);
}
