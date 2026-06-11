/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";

//define the context interface

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

//crteate the context

const ThemeContext = createContext<ThemeContextType | null>(null);

//creating the provider

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  //creating the theme provider

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

//create a custom hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("Theme must be used inside the theme provider");
  }
  return context;
}
