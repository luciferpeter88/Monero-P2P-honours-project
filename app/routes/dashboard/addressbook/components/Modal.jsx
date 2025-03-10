import { useEffect } from "react";
import { useNavigation } from "@remix-run/react";

export default function Modal({ title, isOpen, onClose, children }) {
  const transition = useNavigation();

  // Close the modal when the form is submitted
  useEffect(() => {
    if (transition.state !== "idle") {
      onClose();
    }
  }, [transition.state, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-third p-6 rounded-lg w-full max-w-md relative">
        <button className="absolute top-3 right-3 font-bold" onClick={onClose}>
          X
        </button>
        <div className="mb-4">
          <h2 className="text-xl font-bold text-secondary">{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
