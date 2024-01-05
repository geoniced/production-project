import React, { FC, useEffect, useMemo, useState } from 'react';

import { useJsonSettings } from '@/entities/User';
import { Theme } from '@/shared/const/theme';

import { ThemeContext } from '../../../../shared/lib/context/ThemeContext';

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: React.ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = (props) => {
  const { children, initialTheme } = props;
  const { theme: defaultTheme = Theme.LIGHT } = useJsonSettings();
  const [isThemeInitialized, setIsThemeInitialized] = useState(false);
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);
  document.body.className = theme;

  useEffect(() => {
    if (!isThemeInitialized) {
      setTheme(defaultTheme);
      setIsThemeInitialized(true);
    }
  }, [defaultTheme, isThemeInitialized]);

  const providerValue = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
