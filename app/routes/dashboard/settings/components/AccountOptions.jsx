import { Button } from "../../../../../src/components/components/ui/button";
export default function AccountOption({ icon, title, description }) {
  return (
    <div className="flex justify-between items-center p-4 rounded-lg">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="bg-primary">
        ➝
      </Button>
    </div>
  );
}
