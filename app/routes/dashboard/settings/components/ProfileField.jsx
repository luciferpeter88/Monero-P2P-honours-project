import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../../src/components/components/ui/dialog";
import { Button } from "../../../../../src/components/components/ui/button";
import ProfileModal from "./ProfileModal";
import { useState } from "react";

export default function ProfileField({
  icon,
  title,
  description,
  modalType,
  value,
  colorType,
}) {
  const [hover, sethover] = useState(false);
  return (
    <div
      className="flex justify-between items-center p-4 rounded-lg hover:bg-primary"
      style={hover ? { backgroundColor: colorType?.primary } : {}}
      onMouseMove={() => sethover(true)}
      onMouseLeave={() => sethover(false)}
    >
      <div className="flex items-center gap-3 ">
        {icon}
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-sm text-muted-foreground">{value}</p>
        <Dialog className="bg-transparent">
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-muted-foreground border-none"
            >
              Change {title}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-third">
            <ProfileModal field={modalType} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
