import React, {Suspense, useContext, useState} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import './styles/index.scss';
import {AboutPageAsync} from "./pages/AboutPage/AboutPage.async";
import {MainPageAsync} from "./pages/MainPage/MainPage.async";
import {useTheme} from "./theme/useTheme";
import {classNames} from "./helpers/classNames/classNames";


const App = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <div className={classNames('app', {}, [theme])}>
      <button onClick={toggleTheme} type="button">Переключить тему</button>
      <Link to={'/'}>Главная</Link>
      <Link to={'/about'}>О сайте</Link>
        <Suspense fallback={<div>Загрузка...</div>}>
          <Routes>
            <Route path={'/about'} element={<AboutPageAsync />}/>
            <Route path={'/'} element={<MainPageAsync />}/>
          </Routes>
        </Suspense>
    </div>
  );
};

export default App;