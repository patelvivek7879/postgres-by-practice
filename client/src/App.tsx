import AppContainer from "./AppContainer";
import { ConfigProvider, FloatButton, theme } from "antd";
import { useState } from "react";

import "split-pane-react/esm/themes/default.css";

function App() {

  const [themeVal, setThemeVal] = useState(localStorage.getItem('preferredTheme') === 'dark' ? true : false);

  return(
    <ConfigProvider
    theme={{
      algorithm: themeVal ? theme.darkAlgorithm : theme.defaultAlgorithm,
      components: {
        Layout: {
          headerBg: themeVal ? '#000' : '#fff'
      }}
    }}
    >
    <AppContainer setThemeVal={setThemeVal}/>
    </ConfigProvider>
  )
}

export default App;
