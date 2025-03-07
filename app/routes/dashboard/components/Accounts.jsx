import { FaRegCopy } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { useState, useEffect } from "react";
import { Form } from "@remix-run/react";

export default function Accounts({
  AccountType,
  accountAddress,
  balance,
  id,
  setAccount,
  account,
  data,
  index,
  newName,
  setNewName,
}) {
  const [copied, setCopied] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  useEffect(() => {
    if (openModal && data[account]) {
      setNewName({ id: data[account].id, newName: data[account].accountName });
    }
  }, [openModal, data, account, setNewName]);

  const handleInputChange = (e) => {
    setNewName((prev) => ({
      ...prev,
      newName: e.target.value,
    }));
  };

  return (
    <div
      role="button"
      tabIndex="0"
      onClick={() => setAccount(index)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setAccount(index);
        }
      }}
      className={`flex gap-5 p-3 py-5 border-primary hover:bg-primary hover:border-l-4 hover:border-l-secondary hover:text-secondary rounded-lg items-center cursor-pointer ${
        id === data[account].id
          ? "bg-primary border-l-4 border-l-secondary text-secondary"
          : ""
      }`}
    >
      <p>{AccountType}</p>
      <p className="ml-auto">{`${accountAddress.slice(
        0,
        10
      )}......${accountAddress.slice(-10)}....`}</p>
      <p>
        {balance} <span className="ml-2">XMR</span>
      </p>
      <CiEdit onClick={() => setOpenModal(true)} />
      {copied ? "Copied!" : <FaRegCopy onClick={copyToClipboard} />}

      {openModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-third p-6 rounded-lg w-full max-w-md">
            <Form id="editForm" method="post">
              <div className="mb-4">
                <h2 className="text-xl font-bold">Editing</h2>
                <p className="text-gray-500">Account Name</p>
              </div>
              <input
                type="text"
                name="editMoneroName"
                value={newName.newName}
                onChange={handleInputChange}
                placeholder="Enter new account name"
                className="w-full p-2 border border-gray-300 rounded bg-transparent mb-4"
                required
              />
              <input type="hidden" name="formType" value="editMoneroLabel" />
              <input type="hidden" name="editaccount" value={newName.id} />
              <input
                type="hidden"
                name="newAccountName"
                value={newName.newName}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-red-500 text-white px-4 py-2 rounded"
                  onClick={() => setOpenModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-secondary text-white px-4 py-2 rounded"
                  form="editForm"
                >
                  Save
                </button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
}
