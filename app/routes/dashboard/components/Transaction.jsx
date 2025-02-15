import { Button } from "../../../../src/components/components/ui/button";
export default function WithdrawalRecords({ header, data }) {
  // const transactions = [
  //   {
  //     date: "13/03/24 - 20:54:29",
  //     coin: "0x412313...hbdu12rex",
  //     amount: "2.3",
  //     withdrawTo: "0x412313...hbdu12rex",
  //     blockchainRecord: "16asfzv6...hbdu12rex",
  //     remarks: "-",
  //   },
  //   {
  //     date: "13/03/24 - 20:54:29",
  //     coin: "0x412313...hbdu12rex",
  //     amount: "2.3",
  //     withdrawTo: "0x412313...hbdu12rex",
  //     blockchainRecord: "16asfzv6...hbdu12rex",
  //     remarks: "-",
  //   },
  //   {
  //     date: "13/03/24 - 20:54:29",
  //     coin: "0x412313...hbdu12rex",
  //     amount: "2.3",
  //     withdrawTo: "0x412313...hbdu12rex",
  //     blockchainRecord: "16asfzv6...hbdu12rex",
  //     remarks: "-",
  //   },
  //   {
  //     date: "13/03/24 - 20:54:29",
  //     coin: "0x412313...hbdu12rex",
  //     amount: "2.3",
  //     withdrawTo: "0x412313...hbdu12rex",
  //     blockchainRecord: "16asfzv6...hbdu12rex",
  //     remarks: "-",
  //   },
  // ];

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
              <th className="p-3 text-left font-medium">Date/Time</th>
              <th className="p-3 text-left font-medium">Transaction Id</th>
              <th className="p-3 text-left font-medium">Amount</th>
              <th className="p-3 text-left font-medium">Address From</th>
              <th className="p-3 text-left font-medium">Address To</th>
              <th className="p-3 text-left font-medium">Remarks</th>
              <th className="p-3 text-left font-medium">Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {data.map((txn, index) => (
              <tr
                key={index}
                className=" bg-third border-t border-primary hover:bg-primary hover:bg-opacity-90"
              >
                <td className="p-3">{txn.time}</td>
                <td className="p-3 text-white">{txn.transactionId}</td>
                <td className="p-3">{txn.amount}</td>

                {/* Withdraw To (Ensuring Proper Column Structure) */}
                <td className="p-3 text-white">
                  <div className="flex items-center gap-2">
                    <span>{txn.addressFrom}</span>
                  </div>
                </td>

                {/* Blockchain Record (Ensuring Proper Column Structure) */}
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span>{txn.addressTo}</span>
                  </div>
                </td>

                <td className="p-3">{txn.remarks || "-"}</td>

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
      <Button className="bg-secondary mt-8">History</Button>
    </div>
  );
}
