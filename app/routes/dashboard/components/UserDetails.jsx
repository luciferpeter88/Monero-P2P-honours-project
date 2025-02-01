export default function UserDetails({ firstText, lastText }) {
  return (
    <div className="flex flex-col gap-y-2">
      <p>{firstText}</p>
      <p className="text-sm text-muted-foreground">{lastText}</p>
    </div>
  );
}
