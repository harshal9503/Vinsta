import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { ThemeProvider, ThemeContext } from './src/theme/ThemeContext';

const App = () => {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <ThemeContext.Consumer>
          {({ theme, isDarkMode }) => (
            <>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor={theme.background}
              />
              <AppNavigator />
            </>
          )}
        </ThemeContext.Consumer>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;