import AppContainer from "./AppContainer";
import { ConfigProvider, theme } from "antd";
import { useState } from "react";

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
    <AppContainer setThemeVal={setThemeVal}/>
    </ConfigProvider>
  )
}

export default App;
