import React, { Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInitialized, initAuthData } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { VStack } from '@/shared/ui/Stack';

import { AppRouter } from './providers/router';

function App() {
  const dispatch = useAppDispatch();
  const initialized = useSelector(getUserInitialized);

  useEffect(() => {
    dispatch(initAuthData());
  }, [dispatch]);

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
    <div className="app">
      <Suspense fallback="">
        <Navbar />
        <main className="content-page">
          <Sidebar />
          {initialized && <AppRouter />}
        </main>
      </Suspense>
    </div>
  );
}

export default App;
