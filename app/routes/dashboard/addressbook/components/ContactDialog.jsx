import { Form } from "@remix-run/react";
import { Input } from "../../../../../src/components/components/ui/input";
import { Button } from "../../../../../src/components/components/ui/button";
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

  let style;
  if (isDelete) {
    style = "bg-red-500 hover:bg-red-600";
  } else if (isEdit) {
    style = "bg-green-500 hover:bg-green-600";
  } else {
    style = "bg-secondary hover:bg-opacity-90";
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`flex items-center gap-1 border-none hover:text-white ${style}`}
        >
          {triggerIcon} {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-third border-none">
        <DialogHeader>
          <DialogTitle>
            {isAdd && "Add New Contact"}
            {isEdit && `Edit Contact: ${contact?.name}`}
            {isDelete && `Delete Contact: ${contact?.name}`}
          </DialogTitle>
        </DialogHeader>

        <Form method="post">
          {isDelete ? (
            <p className="text-gray-400 text-sm">
              Are you sure you want to delete{" "}
              <span className="text-red-400">{contact?.name}</span>?
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              <Input type="hidden" name="id" value={contact?.id} />
              <Input
                name="name"
                placeholder="Name"
                defaultValue={contact?.name}
                required={!isDelete}
                className="bg-primary border-muted-foreground focus:ring-offset-white focus-visible:ring-1 "
              />
              <Input
                name="address"
                placeholder="Monero Address"
                defaultValue={contact?.address}
                required={!isDelete}
                className="bg-primary border-muted-foreground focus:ring-offset-white focus-visible:ring-1 "
              />
              <Input
                name="notes"
                placeholder="Notes (Optional)"
                defaultValue={contact?.notes}
                className="bg-primary border-muted-foreground focus:ring-offset-white focus-visible:ring-1 "
              />
            </div>
          )}

          <Input type="hidden" name="_intent" value={actionType} />

          <Button
            type="submit"
            className={`w-full mt-5 ${
              isDelete
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            } text-white`}
          >
            {isDelete ? "Confirm Delete" : "Save Contact"}
          </Button>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
