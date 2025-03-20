import { createContext, useContext, useState } from "react";

// 1. Creating context
const Context = createContext(null);

// 2. Provider component
export function Provider({ children }) {
  const [fontSize, setFontSize] = useState(() => {
    const defaultFontSize = 0;
    const defaultLineHeight = 0;
    return {
      defaultFontSize,
      defaultLineHeight,
      size: {
        fontSize: 16 + defaultFontSize,
        lineHeight: 0 + defaultLineHeight,
        letterSpacing: 0,
      },
      fontFamily: [
        "Inter",
        "serif",
        "sans-serif",
        "monospace",
        "cursive",
        "fantasy",
        "system-ui",
        "ui-serif",
        "ui-sans-serif",
        "ui-monospace",
        "Poppins",
      ],
    };
  });

  return (
    <Context.Provider value={{ fontSize, setFontSize }}>
      {children}
    </Context.Provider>
  );
}

// 3. Custom hook
export function Use() {
  return useContext(Context);
}
