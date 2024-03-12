import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./providers/ThemeProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <BrowserRouter basename="/pbyp">
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
