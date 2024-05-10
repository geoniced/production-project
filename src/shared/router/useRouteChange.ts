import { useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';

import { AppRouteByPathPattern, AppRoutes } from '@/shared/const/router';

export function useRouteChange() {
  const location = useLocation();

  const appRoute = useMemo<AppRoutes>(() => {
    let currentAppRoute = AppRoutes.MAIN;

    Object.entries(AppRouteByPathPattern).forEach(([pattern, route]) => {
      if (matchPath(pattern, location.pathname)) {
        currentAppRoute = route;
      }
    });

    return currentAppRoute;
  }, [location.pathname]);

  return appRoute;
}
