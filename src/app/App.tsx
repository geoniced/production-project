import React, { Suspense, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
// import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from 'app/providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInitialized, userActions } from 'entities/User';

function App() {
  // const { theme } = useTheme();
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
