import { lazy } from 'react';

export const AboutPageAsync = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  // на время; так делать не стоит
  setTimeout(() => resolve(import('./AboutPage')), 1500);
}));
