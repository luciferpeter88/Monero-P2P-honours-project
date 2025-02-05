import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../../src/components/components/ui/dialog";
import { Button } from "../../../../../src/components/components/ui/button";
import ProfileModal from "./ProfileModal";

export default function ProfileField({
  icon,
  title,
  description,
  modalType,
  value,
}) {
  return (
    <div className="flex justify-between items-center p-4 rounded-lg hover:bg-primary">
      <div className="flex items-center gap-3 ">
        {icon}
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-sm text-muted-foreground">{value}</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-muted-foreground border-none"
            >
              Change {title}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <ProfileModal field={modalType} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
