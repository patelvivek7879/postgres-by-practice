import AppContainer from "./AppContainer";
import { ConfigProvider, theme } from "antd";
import { useState } from "react";
import { ThemeProvider } from "./providers/ThemeProvider";

function App() {

  const [themeVal, setThemeVal] = useState(localStorage.getItem('preferredTheme') === 'dark' ? true : false);

  return(
    <ConfigProvider
    theme={{
      algorithm: themeVal ? theme.darkAlgorithm : theme.defaultAlgorithm,
      components: {
        Layout: {
          headerBg: themeVal ? '#222' : '#fff',
          footerBg: themeVal? '#222' : '#fff',
        },
    }
    }}
    >
    <ThemeProvider>
      <AppContainer setThemeVal={setThemeVal}/>
    </ThemeProvider>
    </ConfigProvider>
  )
}

export default App;
