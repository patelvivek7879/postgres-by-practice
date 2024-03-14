import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./AuthProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/pbyp">
    <AuthProvider>
      <App />
    </AuthProvider>
    </BrowserRouter>
);
