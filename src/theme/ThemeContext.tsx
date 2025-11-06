import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {useColorScheme} from 'react-native';
import {COLORS} from '../theme/colors';

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

export const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
  theme: {
    background: COLORS.secondary,
    cardBackground: '#ffffff',
    text: COLORS.text,
    textSecondary: '#666666',
    borderColor: '#f0f0f0',
  },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({children}) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDarkMode(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme: Theme = isDarkMode
    ? {
        background: '#121212',
        cardBackground: '#1e1e1e',
        text: '#ffffff',
        textSecondary: '#a0a0a0',
        borderColor: '#333333',
      }
    : {
        background: COLORS.secondary,
        cardBackground: '#ffffff',
        text: COLORS.text,
        textSecondary: '#666666',
        borderColor: '#f0f0f0',
      };

  return (
    <ThemeContext.Provider value={{isDarkMode, toggleDarkMode, theme}}>
      {children}
    </ThemeContext.Provider>
  );
};