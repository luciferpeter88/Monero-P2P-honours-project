import { Button } from "../../../../src/components/components/ui/button";
import { Link } from "@remix-run/react";
import { Use } from "../context/Context";
import useStoredValue from "../components/useStoredValue";
export default function WithdrawalRecords({ header, data }) {
  const { fontSize } = Use();

  const typography = useStoredValue("typography");
  const headerStyle = {
    fontSize: typography?.size.fontSize - 2 || fontSize.size.fontSize - 2,
    letterSpacing: typography?.size.lineHeight || fontSize.size.lineHeight,
  };
  const bodyStyle = {
    fontSize: typography?.size.fontSize - 3 || fontSize.size.fontSize - 3,
    letterSpacing: typography?.size.lineHeight || fontSize.size.lineHeight,
  };
  return (
    <div className="bg-third text-white p-6 rounded-xl shadow-lg mt-5">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-medim">
          {header || "Trasnaction History"}
        </h2>
      </div>

      {/* Table */}
      <div className="overflow-x-auto ">
        <table className="w-full border-collapse text-left text-sm text-muted-foreground">
          {/* Table Head */}
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-3 text-left font-medium" style={headerStyle}>
                Date/Time
              </th>
              <th className="p-3 text-left font-medium" style={headerStyle}>
                Transaction Id
              </th>
              <th className="p-3 text-left font-medium" style={headerStyle}>
                Amount
              </th>
              <th className="p-3 text-left font-medium" style={headerStyle}>
                Address From
              </th>
              <th className="p-3 text-left font-medium" style={headerStyle}>
                Address To
              </th>
              <th className="p-3 text-left font-medium" style={headerStyle}>
                Remarks
              </th>
              <th className="p-3 text-left font-medium" style={headerStyle}>
                Action
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((txn, index) => (
              <tr
                key={index}
                className=" bg-third border-t border-primary hover:bg-primary hover:bg-opacity-90"
              >
                <td className="p-3" style={bodyStyle}>
                  {txn.time}
                </td>
                <td className="p-3 text-white" style={bodyStyle}>
                  {txn.transactionId}
                </td>
                <td className="p-3" style={bodyStyle}>
                  {txn.amount}
                </td>

                {/* Withdraw To (Ensuring Proper Column Structure) */}
                <td className="p-3 text-white">
                  <div className="flex items-center gap-2">
                    <span style={bodyStyle}>{txn.addressFrom}</span>
                  </div>
                </td>

                {/* Blockchain Record (Ensuring Proper Column Structure) */}
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span style={bodyStyle}>{txn.addressTo}</span>
                  </div>
                </td>

                <td className="p-3" style={bodyStyle}>
                  {txn.remarks || "-"}
                </td>

                {/* Action Button */}
                <td className="p-3">
                  <Button className="bg-muted-foreground hover:bg-white hover:text-primary">
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/dashboard/transactions">
        <Button className="bg-secondary mt-8">History</Button>
      </Link>
    </div>
  );
}
