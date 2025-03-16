import { Button } from "../../../../../src/components/components/ui/button";
import Modal from "./Modal";
import { useState } from "react";

export default function AccountOption({
  icon,
  title,
  description,
  modalType,
  actionType,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between items-center p-4 rounded-lg hover:bg-primary">
      <Modal
        modalType={modalType}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        actionType={actionType}
      />
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="bg-muted-foreground"
        onClick={() => setIsOpen(true)}
      >
        ➝
      </Button>
    </div>
  );
}
