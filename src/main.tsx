import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { PostProvider } from "./context/PostContext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PostProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </PostProvider>
  </StrictMode>,
);
