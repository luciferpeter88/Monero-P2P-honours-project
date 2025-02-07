export default function SectionHeader({ title, description }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-medim">{title}</h2>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
