import React, {Suspense} from 'react';
import {Route, Routes} from "react-router-dom";
import {routeConfig} from "../lib/routeConfig";

const AppRouter = () => {
  return (
    <div className={'page-wrapper'}>
      <Suspense fallback={<div>Загрузка...</div>}>
        <Routes>
          {Object.values(routeConfig).map(({element, path}) => (
            <Route
              key={path}
              path={path}
              element={element}
            />
          ))}
        </Routes>
      </Suspense>
    </div>
  );
};

export default AppRouter;