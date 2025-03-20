import { Input } from "../../../../../src/components/components/ui/input";
import { useState, useEffect } from "react";
export default function ColourSelection({ label, type }) {
  const [selectedColour, setSelectedColour] = useState({
    primary: "#141919",
    secondary: "#f88415",
    tertiary: "#232828",
  });

  useEffect(() => {
    const storedColour = localStorage.getItem("colourType");
    if (storedColour) {
      setSelectedColour(JSON.parse(storedColour));
    }
  }, []);

  return (
    <div>
      <label className="block text-sm font-medium text-white">{label}</label>
      <Input
        type="color"
        value={selectedColour[type]}
        onChange={(e) =>
          setSelectedColour((prev) => {
            localStorage.setItem(
              "colourType",
              JSON.stringify({ ...prev, [type]: e.target.value })
            );
            return { ...prev, [type]: e.target.value };
          })
        }
        className="bg-primary border-none"
      />
    </div>
  );
}
