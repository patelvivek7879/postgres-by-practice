import "split-pane-react/esm/themes/default.css";
import AppContainer from "./AppContainer";
import { ConfigProvider, theme } from "antd";


function App() {

  const preferredTheme = localStorage.getItem("preferredTheme");

  return(
    <ConfigProvider
    theme={{
      // 1. Use dark algorithm
      // algorithm: preferredTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
      algorithm: theme.darkAlgorithm ,

      // 2. Combine dark algorithm and compact algorithm
      // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
    }}
  >
    <AppContainer/>
    </ConfigProvider>
  )
}

export default App;
