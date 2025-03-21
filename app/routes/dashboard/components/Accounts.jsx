import { FaRegCopy } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { useState, useEffect } from "react";
import { Form } from "@remix-run/react";
import Modal from "../components/Modal";
import { Use } from "../context/Context";
import useStoredValue from "../components/useStoredValue";

export default function Accounts({
  AccountType,
  accountAddress,
  balance,
  id,
  setAccount,
  account,
  data,
  index,
}) {
  const [copied, setCopied] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newName, setNewName] = useState({ id: "", newName: "" });

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
  const typography = useStoredValue("typography");
  const colorType = useStoredValue("colourType");
  const [isHovered, setIsHovered] = useState(false);
  const style = {
    backgroundColor:
      id === data[account].id || isHovered ? colorType?.primary : null,
    borderLeftColor:
      id === data[account].id || isHovered ? colorType?.secondary : null,
    color: id === data[account].id || isHovered ? colorType?.tertiary : null,
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
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <p
        style={{
          fontSize: typography?.size.fontSize + "px",
          letterSpacing: typography?.size.lineHeight,
        }}
      >
        {AccountType}
      </p>
      <p
        className="ml-auto"
        style={{
          fontSize: typography?.size.fontSize - 1.5 + "px",
          letterSpacing: typography?.size.lineHeight,
        }}
      >{`${accountAddress.slice(0, 10)}......${accountAddress.slice(
        -10
      )}....`}</p>
      <p
        style={{
          fontSize: typography?.size.fontSize - 1.5 + "px",
          letterSpacing: typography?.size.lineHeight,
        }}
      >
        {balance} <span className="ml-2">XMR</span>
      </p>
      <CiEdit onClick={() => setOpenModal(true)} />
      {copied ? "Copied!" : <FaRegCopy onClick={copyToClipboard} />}

      {openModal && (
        <Form id="editForm" method="post">
          <Modal
            title="Editing"
            isOpen={openModal}
            onClose={() => setOpenModal(false)}
          >
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
          </Modal>
        </Form>
      )}
    </div>
  );
}
