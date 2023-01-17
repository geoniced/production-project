import { lazy } from 'react';

export const ArticlesPageAsync = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  // на время; так делать не стоит
  setTimeout(() => resolve(import('./ArticlesPage')), 1500);
}));
