import {
  DialogHeader,
  DialogTitle,
} from "../../../../../src/components/components/ui/dialog";
import { Input } from "../../../../../src/components/components/ui/input";
import { Button } from "../../../../../src/components/components/ui/button";
import { Trash2 } from "lucide-react";
import { Form } from "@remix-run/react";

export default function ProfileModal({ field }) {
  return (
    <div className="p-6 bg-third">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold text-white mb-5">
          Update {field}
        </DialogTitle>
      </DialogHeader>

      <Form method="post" encType="multipart/form-data" className="space-y-4">
        {field === "photo" ? (
          <>
            <Input
              type="file"
              name="profilePhoto"
              accept="image/*"
              className="w-full border p-2 bg-gray-800 text-white rounded"
              // required
            />
            <input type="hidden" name="deletePhoto" value="true" />

            <Button
              variant="destructive"
              name="action"
              value="delete"
              type="submit"
            >
              <Trash2 size={16} className="mr-2" />
              Delete Photo
            </Button>
          </>
        ) : (
          <>
            <Input
              type="text"
              name={field}
              placeholder={`Enter new ${field}`}
              required
              className="w-full border p-2 bg-gray-800 text-white rounded"
            />
          </>
        )}
        <Button className="w-full bg-secondary  text-white px-5 py-2">
          Update {field}
        </Button>
      </Form>
    </div>
  );
}
