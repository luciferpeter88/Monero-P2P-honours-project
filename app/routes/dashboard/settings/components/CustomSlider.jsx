import React from "react";
import { Slider } from "../../../../../src/components/components/ui/slider";

export default function CustomSlider({
  label,
  defaultState,
  updateState,
  localStorageState,
  type,
}) {
  const [typeography, setTypeography] = React.useState();
  React.useEffect(() => {
    const storedTypeography = localStorage.getItem("typograhpy");
    if (storedTypeography) {
      setTypeography(JSON.parse(storedTypeography));
    }
  }, [localStorageState]);

  return (
    <React.Fragment>
      <label className="block text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <Slider
        value={[
          type === "defaultFontSize"
            ? typeography?.defaultFontSize || defaultState
            : typeography?.defaultLineHeight || defaultState,
        ]}
        min={0}
        max={5}
        step={0.1}
        onValueChange={(newValue) =>
          updateState((prev) => {
            localStorage.setItem(
              "typograhpy",
              JSON.stringify(localStorageState)
            );
            if (type === "defaultFontSize") {
              return {
                ...prev,
                defaultFontSize: Number(newValue),
                size: {
                  ...prev.size,
                  fontSize: 16 + Number(newValue),
                  lineHeight: 1.5 + Number(newValue),
                },
              };
            }
            return {
              ...prev,
              defaultLineHeight: Number(newValue),
              size: {
                ...prev.size,
                lineHeight: 1.5 + Number(newValue),
              },
            };
          })
        }
        className="mt-2"
      />
      <span className="text-muted-foreground block">
        {type === "defaultFontSize"
          ? typeography?.defaultFontSize || defaultState
          : typeography?.defaultLineHeight || defaultState}
      </span>
    </React.Fragment>
  );
}
