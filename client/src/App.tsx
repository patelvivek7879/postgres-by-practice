import React from "react";
import AppContainer from "./AppContainer";
import { ConfigProvider, theme, App as AntApp } from "antd";
import { useState } from "react";
import { ThemeProvider } from "./providers/ThemeProvider";
import { ProgressProvider } from "./providers/ProgressProvider";

function App() {
  const [themeVal, setThemeVal] = useState(
    localStorage.getItem("preferredTheme") === "dark" ? true : false
  );

  return (
    <ConfigProvider
      theme={{
        algorithm: themeVal ? theme.darkAlgorithm : theme.defaultAlgorithm,
        components: {
          Layout: {
            headerBg: themeVal ? "#222" : "#fff",
            footerBg: themeVal ? "#222" : "#fff",
          },
        },
      }}
    >
      <AntApp>
        <ThemeProvider>
          {/*TODO: Progress Provider */}
          <ProgressProvider>
          <AppContainer setThemeVal={setThemeVal} />
          </ProgressProvider>
        </ThemeProvider>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
