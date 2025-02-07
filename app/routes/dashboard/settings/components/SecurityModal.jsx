import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../../src/components/components/ui/dialog";
import { Input } from "../../../../../src/components/components/ui/input";
import { Button } from "../../../../../src/components/components/ui/button";

export default function SecurityModal({ field }) {
  return (
    <div className="p-6">
      <DialogHeader>
        <DialogTitle className="text-lg font-semibold text-white">
          Set up {field}
        </DialogTitle>
      </DialogHeader>

      <form method="post" className="space-y-4">
        <Input
          type="text"
          name={field}
          placeholder={`Enter new ${field}`}
          required
          className="w-full border p-2 bg-gray-800 text-white rounded"
        />
        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white px-5 py-2">
          Confirm {field}
        </Button>
      </form>
    </div>
  );
}
