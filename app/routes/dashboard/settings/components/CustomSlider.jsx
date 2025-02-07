import React from "react";
import { Slider } from "../../../../../src/components/components/ui/slider";
export default function CustomSlider({ label, defaultState, updateState }) {
  return (
    <React.Fragment>
      <label className="block text-sm font-medium text-muted-foreground">
        {label}
      </label>
      <Slider
        value={[defaultState]}
        min={1}
        max={3}
        step={0.1}
        onValueChange={(newValue) => updateState(newValue)}
        className="mt-2"
      />
      <span className="text-muted-foreground block">{defaultState}</span>
    </React.Fragment>
  );
}
