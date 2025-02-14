import { FaRegCopy } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
export default function Accounts({ AccountType, accountAddress, balance, id }) {
  // this will be fetched from the database, but now we are setting it to 1
  let setAccount = 1;
  return (
    <div
      className={`flex gap-5   p-3 py-5  border-primary hover:bg-primary hover:border-l-4 hover:border-l-secondary hover:text-secondary  rounded-lg items-center cursor-pointer ${
        id === setAccount
          ? "bg-primary border-l-4 border-l-secondary text-secondary"
          : ""
      }`}
    >
      <p>{AccountType}</p>
      <p className="ml-auto">{accountAddress}</p>
      <p>
        {balance} <span className="ml-2"> XMR</span>
      </p>
      <CiEdit />
      <FaRegCopy />
    </div>
  );
}
