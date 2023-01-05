import { lazy } from 'react';

export const ProfilePageAsync = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  // на время; так делать не стоит
  setTimeout(() => resolve(import('./ProfilePage')), 1500);
}));
