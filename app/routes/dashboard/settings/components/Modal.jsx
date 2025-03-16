import { Form } from "@remix-run/react";

export default function Modal({ modalType, isOpen, setIsOpen, actionType }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-third p-6 rounded-lg w-full max-w-lg relative">
            <button
              className="absolute top-3 right-3 font-bold"
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
            <h3 className="text-lg font-medium text-secondary">{modalType}</h3>
            <Form method="post" className="space-y-4">
              <div className="flex justify-end gap-2 mt-5">
                <input type="hidden" name="actionAccount" value={actionType} />
                <button
                  type="button"
                  className="bg-secondary text-white px-4 py-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>

                <button
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  type="submit"
                >
                  Yes
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}
