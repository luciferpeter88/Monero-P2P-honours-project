export default function TransactionHistory() {
  const transactions = [
    {
      id: "TXN001",
      time: "2024-02-01 14:30",
      amount: "0.2",
      type: "Sent",
    },
    {
      id: "TXN002",
      time: "2024-02-01 16:45",
      amount: "0.6",
      type: "Recieved",
    },
    {
      id: "TXN003",
      time: "2024-02-02 09:15",
      amount: "0.56",
      type: "Sent",
    },
    {
      id: "TXN004",
      time: "2024-02-02 11:00",
      amount: "3",
      type: "Recieved",
    },
  ];

  return (
    <div className=" mx-auto p-5 mt-5 bg-third shadow-lg rounded-lg flex flex-col">
      <h2 className="text-2xl font-semibold mb-4">
        Latest Transaction History
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left text-gray-700">ID</th>
              <th className="py-3 px-4 text-left text-gray-700">Time</th>
              <th className="py-3 px-4 text-left text-gray-700">Amount</th>
              <th className="py-3 px-4 text-left text-gray-700">Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((txn, index) => (
              <tr key={index} className="border-t border-muted-foreground">
                <td className="py-2 px-4">{txn.id}</td>
                <td className="py-2 px-4">{txn.time}</td>
                <td className="py-2 px-4">{txn.amount}</td>
                <td
                  className={`py-2 px-4 font-medium ${
                    txn.type === "Recieved"
                      ? "text-green-500"
                      : "text-secondary"
                  }`}
                >
                  {txn.type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="inline-flex items-center justify-center rounded-xl bg-secondary hover:bg-opacity-80 h-10 p-5 font-dm text-sm font-medium text-white shadow-xl shadow-orange-400/15 transition-transform duration-200 ease-in-out hover:scale-[0.98] mt-10 ml-auto">
        View All
      </button>
    </div>
  );
}
