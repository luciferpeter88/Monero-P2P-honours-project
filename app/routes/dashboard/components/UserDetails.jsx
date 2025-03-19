import { Use } from "../context/Context";
import useStoredValue from "../components/useStoredValue";

export default function UserDetails({ firstText, lastText }) {
  const { fontSize } = Use();
  const typography = useStoredValue("typography");

  return (
    <div className="flex flex-col gap-y-2">
      <p
        style={{
          fontSize: typography?.size.fontSize - 1 || fontSize.size.fontSize - 1,
        }}
      >
        {firstText}
      </p>
      <p
        className="text-sm text-muted-foreground"
        style={{
          fontSize: typography?.size.fontSize - 2 || fontSize.size.fontSize - 2,
        }}
      >
        {lastText}
      </p>
    </div>
  );
}
