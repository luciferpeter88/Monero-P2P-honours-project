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
      // h3: {
      //   fontSize: 16 + defaultFontSize,
      //   lineHeight: 1.5 + defaultLineHeight,
      //   letterSpacing: 0,
      // },
      // h2: {
      //   fontSize: 24 + defaultFontSize,
      //   lineHeight: 1.5 + defaultLineHeight,
      //   letterSpacing: 0,
      // },
      // p: {
      //   fontSize: 14 + defaultFontSize,
      //   lineHeight: 1.5 + defaultLineHeight,
      //   letterSpacing: 0,
      // },
      // button: {
      //   fontSize: 16 + defaultFontSize,
      //   lineHeight: 1.5 + defaultLineHeight,
      //   letterSpacing: 0,
      // },
      // input: {
      //   fontSize: 16 + defaultFontSize,
      //   lineHeight: 1.5 + defaultLineHeight,
      //   letterSpacing: 0,
      // },
      // label: {
      //   fontSize: 16 + defaultFontSize,
      //   lineHeight: 1.5 + defaultLineHeight,
      //   letterSpacing: 0,
      // },
      // thead: {
      //   fontSize: 16 + defaultFontSize,
      //   lineHeight: 1.5 + defaultLineHeight,
      //   letterSpacing: 0,
      // },
      // th: {
      //   fontSize: 16 + defaultFontSize,
      //   lineHeight: 1.5 + defaultLineHeight,
      //   letterSpacing: 0,
      // },
      // td: {
      //   fontSize: 16 + defaultFontSize,
      //   lineHeight: 1.5 + defaultLineHeight,
      //   letterSpacing: 0,
      // },
      // select: {
      //   fontSize: 16 + defaultFontSize,
      //   lineHeight: 1.5 + defaultLineHeight,
      //   letterSpacing: 0,
      // },
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
