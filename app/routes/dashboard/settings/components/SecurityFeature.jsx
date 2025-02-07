import { Switch } from "../../../../../src/components/components/ui/switch";
import SecurityModal from "./SecurityModal";
export default function SecurityFeature({
  icon,
  title,
  description,
  buttonLabel,
  modalType,
}) {
  return (
    <div className="flex justify-between items-center hover:bg-primary p-4 rounded-lg">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {/* <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            {buttonLabel}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <SecurityModal field={modalType} />
        </DialogContent>
      </Dialog> */}
      <Switch className="data-[state=checked]:bg-secondary data-[state=unchecked]:bg-muted-foreground" />
    </div>
  );
}
