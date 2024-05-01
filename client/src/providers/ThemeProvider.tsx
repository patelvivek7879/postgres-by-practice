import { createContext, useState, useContext } from 'react';

// Create a context for the theme
const ThemeContext = createContext(null);

// Create a provider component
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("preferredTheme") === "dark" ? "dark" : "light",
  );
  
  const toggleTheme = (theme: string) => {
    // setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));

    setTheme(theme);
    if(theme === "dark") {
      localStorage.setItem("preferredTheme", 'dark' );
    }else{
      localStorage.setItem("preferredTheme", 'light' );
    }
  };

  const themeContext = {
    theme,
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={themeContext}>
      {children}
    </ThemeContext.Provider>
  );
};


// Custom hook to consume the theme context
export const useThemeContext = () =>  useContext(ThemeContext);