import useStoredValue from "../components/useStoredValue";

export default function UserDetails({ firstText, lastText }) {
  const typography = useStoredValue("typography");

  return (
    <div className="flex flex-col gap-y-2">
      <p
        style={{
          fontSize: typography?.size.fontSize - 1 + "px",
          letterSpacing: typography?.size.lineHeight,
        }}
      >
        {firstText}
      </p>
      <p
        className="text-sm text-muted-foreground"
        style={{
          fontSize: typography?.size.fontSize - 2 + "px",
          letterSpacing: typography?.size.lineHeight,
        }}
      >
        {lastText}
      </p>
    </div>
  );
}
