import React from 'react';

interface Theme {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const ThemeContext = React.createContext<Partial<Theme>>({
  darkMode: true,
});
