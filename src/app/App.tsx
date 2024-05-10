import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInitialized, initAuthData } from '@/entities/User';
import { MainLayout } from '@/shared/layouts/MainLayout';
import { ToggleFeatures } from '@/shared/lib/features';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from '@/shared/ui/redesigned/Stack';

import { AppRouter } from './providers/router';

function App() {
  const dispatch = useAppDispatch();
  const initialized = useSelector(getUserInitialized);

  useEffect(() => {
    if (!initialized) {
      dispatch(initAuthData());
    }
  }, [dispatch, initialized]);

  if (!initialized) {
    return (
      <VStack align="center" justify="center" max className="app">
        <main className="content-page" style={{ height: '100%' }}>
          <VStack
            align="center"
            justify="center"
            max
            style={{ height: '100%' }}
          >
            <PageLoader />
          </VStack>
        </main>
      </VStack>
    );
  }

  return (
    <ToggleFeatures
      feature="isAppRedesigned"
      on={
        <div id="app" className="app_redesigned">
          <Suspense fallback="">
            <MainLayout
              header={<Navbar />}
              content={<AppRouter />}
              sidebar={<Sidebar />}
              toolbar={<div>{}</div>}
            />
          </Suspense>
        </div>
      }
      off={
        <div id="app" className="app">
          <Suspense fallback="">
            <Navbar />
            <main className="content-page">
              <Sidebar />
              <AppRouter />
            </main>
          </Suspense>
        </div>
      }
    />
  );
}

export default App;
