import { Switch } from "../../../../../../src/components/components/ui/switch";
import useStoredValue from "../../../components/useStoredValue";
import { useState } from "react";

export default function Card2({
  key,
  label,
  description,
  checked,
  onCheckedChange,
}) {
  const colorType = useStoredValue("colourType");
  const [hover, sethover] = useState(false);
  return (
    <div
      key={key}
      className="flex justify-between items-center p-4  hover:bg-primary rounded-lg "
      style={hover ? { backgroundColor: colorType?.primary } : {}}
      onMouseMove={() => sethover(true)}
      onMouseLeave={() => sethover(false)}
    >
      <div>
        <h2 className="font-medium text-sm text-white">{label}</h2>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch
        className="data-[state=checked]:bg-secondary data-[state=unchecked]:bg-muted-foreground"
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
}
