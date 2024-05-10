import { ReactElement } from 'react';

import { ScrollToolbar } from '@/widgets/ScrollToolbar';
import { AppRoutes } from '@/shared/const/router';
import { useRouteChange } from '@/shared/router/useRouteChange';

export function useAppToolbar() {
  const appRoute = useRouteChange();

  const toolbarByAppRoute: OptionalRecord<AppRoutes, ReactElement> = {
    [AppRoutes.ARTICLES]: <ScrollToolbar />,
    [AppRoutes.ARTICLE_DETAILS]: <ScrollToolbar />,
  };

  return toolbarByAppRoute[appRoute];
}
