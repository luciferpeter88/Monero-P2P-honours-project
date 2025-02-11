import { Form } from "@remix-run/react";
import { Input } from "../../../../../src/components/components/ui/input";
import { Button } from "../../../../../src/components/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../src/components/components/ui/dialog";

export default function ContactDialog({
  actionType,
  contact,
  triggerLabel,
  triggerIcon,
}) {
  const isDelete = actionType === "delete";
  const isEdit = actionType === "edit";
  const isAdd = actionType === "add";

  // Determine styles for the trigger button based on the action type
  let triggerStyle;
  if (isDelete) {
    triggerStyle = "bg-red-500 hover:bg-red-600";
  } else if (isEdit) {
    triggerStyle = "bg-green-500 hover:bg-green-600";
  } else {
    triggerStyle = "bg-secondary hover:bg-secondary/90";
  }

  // Determine styles for the submit button
  const submitStyle = isDelete
    ? "bg-red-500 hover:bg-red-600"
    : "bg-green-500 hover:bg-green-600";

  return (
    <Dialog>
      {/* Trigger Button */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center gap-1 border-none ${triggerStyle} hover:text-white`}
        >
          {triggerIcon} {triggerLabel}
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="bg-third border-none p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold mb-2">
            {isAdd && "Add New Contact"}
            {isEdit && `Edit Contact: ${contact?.name}`}
            {isDelete && `Delete Contact: ${contact?.name}`}
          </DialogTitle>
        </DialogHeader>

        <Form method="post" className="mt-4 space-y-5">
          {isDelete ? (
            // Delete Confirmation Message
            <React.Fragment>
              <p className="text-gray-400 text-sm">
                Are you sure you want to delete{" "}
                <span className="text-red-400">{contact?.name}</span>?
              </p>
              <Input type="hidden" name="id" value={contact?.id} />
            </React.Fragment>
          ) : (
            // Input Fields for Add/Edit Actions
            <div className="flex flex-col gap-4">
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
            </div>
          )}

          {/* Hidden Intent Input */}
          <Input type="hidden" name="_intent" value={actionType} />

          {/* Submit Button */}
          <Button
            type="submit"
            className={`w-full mt-4 ${submitStyle} text-white`}
          >
            {isDelete ? "Confirm Delete" : "Save Contact"}
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
