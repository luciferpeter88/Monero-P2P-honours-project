import { Input } from "../../../../../src/components/components/ui/input";
export default function ColourSelection({ label, defaultState, updateState }) {
  return (
    <div>
      <label className="block text-sm font-medium text-white">{label}</label>
      <Input
        type="color"
        value={defaultState}
        onChange={(e) => updateState(e)}
        className="bg-primary border-none"
      />
    </div>
  );
}
