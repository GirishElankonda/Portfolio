import React, { createContext, useContext } from 'react';

const ThemeContext = createContext({
  primary: '#00E5FF',
  secondary: '#C0C0C0',
  teamId: 'mercedes',
});

export const useTheme = () => useContext(ThemeContext);
export default ThemeContext;
