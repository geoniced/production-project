import React, { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';
import { getUserInitialized, userActions } from '@/entities/User';
import { classNames } from '@/shared/lib/classNames/classNames';

import { AppRouter } from './providers/router';

function App() {
  const dispatch = useDispatch();
  const initialized = useSelector(getUserInitialized);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames('app', {})}>
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
