import { FaRegCopy } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
export default function Accounts({ AccountType, additionalClasses }) {
  return (
    <div
      className={`flex gap-5   p-3 py-5  border-primary hover:bg-primary hover:border-l-4 hover:border-l-secondary hover:text-secondary  rounded-lg items-center cursor-pointer ${additionalClasses}`}
    >
      <p>{AccountType}</p>
      <p className="ml-auto">86vWpt....jjnj40</p>
      <p>
        9.377160181 <span className="ml-2"> XMR</span>
      </p>
      <CiEdit />
      <FaRegCopy />
    </div>
  );
}
