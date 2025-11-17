import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { COLORS } from '../theme/colors';

// ----- Theme Interfaces -----
interface Theme {
  background: string;
  cardBackground: string;
  text: string;
  textSecondary: string;
  borderColor: string;
}

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  theme: Theme;
}

// ----- Default Theme -----
const defaultTheme: Theme = {
  background: COLORS.secondary,
  cardBackground: '#ffffff',
  text: COLORS.text,
  textSecondary: '#666666',
  borderColor: '#f0f0f0',
};

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  theme: defaultTheme,
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  // Listen for system theme change
  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  // You can define your themes here or import as objects
  const darkTheme: Theme = {
    background: '#121212',
    cardBackground: '#1e1e1e',
    text: '#ffffff',
    textSecondary: '#a0a0a0',
    borderColor: '#333333',
  };

  const lightTheme: Theme = {
    background: COLORS.secondary,
    cardBackground: '#ffffff',
    text: COLORS.text,
    textSecondary: '#666666',
    borderColor: '#f0f0f0',
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};
