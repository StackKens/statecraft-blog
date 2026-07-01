import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/home.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { PostProvider } from "./context/PostContext.tsx";
import { AuthProvider } from "./context/AuthConext.tsx";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <PostProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </PostProvider>
    </AuthProvider>
  </StrictMode>,
);
