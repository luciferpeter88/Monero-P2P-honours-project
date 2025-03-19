import { useState, useEffect } from "react";

function useStoredValue(key) {
  const [storedValue, setStoredValue] = useState(null);

  useEffect(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error("Error reading localStorage:", error);
    }
  }, [key]);

  return storedValue; // Only returns the value, no setter function
}

export default useStoredValue;
