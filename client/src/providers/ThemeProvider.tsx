import { createContext, useState, useContext } from 'react';

// Create a context for the theme
const ThemeContext = createContext(null);

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light'); // Default theme is light
  
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to consume the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};
