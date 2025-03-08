import { useNavigation } from "@remix-run/react";
import { useEffect } from "react";

export default function EditAccountModal({ title, isOpen, onClose, children }) {
  const transition = useNavigation();
  // close the modal when the form is submitted
  const isSubmitting = transition.state === "submitting";
  useEffect(() => {
    if (transition.state !== "idle") {
      onClose();
    }
  }, [transition.state, onClose]);
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-third p-6 rounded-lg w-full max-w-md relative">
        <button className="absolute top-3 right-3 font-bold" onClick={onClose}>
          X
        </button>
        <div className="mb-4">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-secondary">{title}</h2>
            <p className="text-gray-500">Account Name</p>
          </div>
          {children}
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="bg-secondary text-white px-4 py-2 rounded"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
