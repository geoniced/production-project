import { lazy } from 'react';

export const MainPageAsync = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  // на время; так делать не стоит
  setTimeout(() => resolve(import('./MainPage')), 1500);
}));
