import { createContext } from 'react';
import { ThemeType } from './base';

const CustomThemeContext = createContext<{
  currentTheme: ThemeType;
  toggleTheme: () => void;
}>({
  currentTheme: 'dark',
  toggleTheme: () => null,
});

export default CustomThemeContext;
