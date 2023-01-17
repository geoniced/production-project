import { lazy } from 'react';

export const ArticleDetailsPageAsync = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  // на время; так делать не стоит
  setTimeout(() => resolve(import('./ArticleDetailsPage')), 1500);
}));
