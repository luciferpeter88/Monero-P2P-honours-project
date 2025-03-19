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
  console.log(typeography);

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
            return {
              ...prev,
              defaultFontSize: Number(newValue),
              defaultLineHeight: Number(newValue),
              size: {
                ...prev.size,
                fontSize: 16 + Number(newValue),
                lineHeight: 1.5 + Number(newValue),
              },
              // h2: {
              //   ...prev.h2,
              //   fontSize: 24 + Number(newValue),
              // },
              // p: {
              //   ...prev.p,
              //   fontSize: 14 + Number(newValue),
              // },
              // button: {
              //   ...prev.button,
              //   fontSize: 16 + Number(newValue),
              // },
              // input: {
              //   ...prev.input,
              //   fontSize: 16 + Number(newValue),
              // },
              // label: {
              //   ...prev.label,
              //   fontSize: 16 + Number(newValue),
              // },
              // thead: {
              //   ...prev.thead,
              //   fontSize: 16 + Number(newValue),
              // },
              // th: {
              //   ...prev.th,
              //   fontSize: 16 + Number(newValue),
              // },
              // td: {
              //   ...prev.td,
              //   fontSize: 16 + Number(newValue),
              // },
              // select: {
              //   ...prev.select,
              //   fontSize: 16 + Number(newValue),
              // },
              // h3: {
              //   ...prev.h3,
              //   fontSize: 16 + Number(newValue),
              // },
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
