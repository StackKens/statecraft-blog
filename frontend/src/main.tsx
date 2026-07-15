import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { PostProvider } from "./context/PostContext.tsx";
import { AuthProvider } from "./context/AuthConext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
