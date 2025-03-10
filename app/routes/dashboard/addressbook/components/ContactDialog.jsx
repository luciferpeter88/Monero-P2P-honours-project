import { Form } from "@remix-run/react";
import { Input } from "../../../../../src/components/components/ui/input";
import { Button } from "../../../../../src/components/components/ui/button";
import React, { useState } from "react";
import Modal from "./Modal";
export default function ContactDialog({
  actionType,
  contact,
  triggerLabel,
  triggerIcon,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const isDelete = actionType === "delete";
  const isEdit = actionType === "edit";
  const isAdd = actionType === "add";

  // Determine modal title based on action type
  let modalTitle = "";
  if (isAdd) modalTitle = "Add New Contact";
  else if (isEdit) modalTitle = "Edit Contact";
  else if (isDelete) modalTitle = "Delete Contact";

  // Determine trigger button style based on action type
  let triggerStyle;
  if (isDelete) {
    triggerStyle = "bg-red-500 hover:bg-red-600";
  } else if (isEdit) {
    triggerStyle = "bg-green-500 hover:bg-green-600";
  } else {
    triggerStyle = "bg-secondary hover:bg-secondary/90";
  }

  // Determine submit button style based on action type
  const submitStyle = isDelete
    ? "bg-red-500 hover:bg-red-600 text-white"
    : "bg-green-500 hover:bg-green-600 text-white";

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <React.Fragment>
      {/* Trigger Button */}
      <Button
        variant="outline"
        size="sm"
        className={`flex items-center gap-1 border-none ${triggerStyle} text-white hover:text-white`}
        onClick={() => setIsOpen(true)}
      >
        {triggerIcon} {triggerLabel}
      </Button>

      {/* Modal */}
      <Modal title={modalTitle} isOpen={isOpen} onClose={handleClose}>
        <Form method="post" className="mt-4 space-y-5">
          {isDelete ? (
            <React.Fragment>
              {/* Delete Confirmation */}
              <p className="text-gray-400 text-sm">
                Are you sure you want to delete{" "}
                <span className="text-red-400">{contact?.name}</span>?
              </p>
              <Input type="hidden" name="id" value={contact?.id} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              {/* Add/Edit Contact Fields */}
              <Input type="hidden" name="id" value={contact?.id} />
              <Input
                name="name"
                placeholder="Name"
                defaultValue={contact?.name}
                required
                className="bg-primary border-muted-foreground focus:ring focus:ring-offset-white focus-visible:ring-1"
              />
              <Input
                name="address"
                placeholder="Monero Address"
                defaultValue={contact?.address}
                required
                className="bg-primary border-muted-foreground focus:ring focus:ring-offset-white focus-visible:ring-1"
              />
              <Input
                name="notes"
                placeholder="Notes (Optional)"
                defaultValue={contact?.notes}
                className="bg-primary border-muted-foreground focus:ring focus:ring-offset-white focus-visible:ring-1"
              />
            </React.Fragment>
          )}

          {/* Hidden Intent Input */}
          <Input type="hidden" name="_intent" value={actionType} />

          {/* Form Submit & Cancel Buttons */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`${submitStyle} text-white px-4 py-2 rounded`}
            >
              {isDelete ? "Confirm Delete" : "Save Contact"}
            </Button>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
}
