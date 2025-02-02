export default function TransactionHistory() {
  const transactions = [
    {
      id: "TXN001",
      time: "2024-02-01 14:30",
      amount: "$250.00",
      type: "Received",
    },
    { id: "TXN002", time: "2024-02-01 16:45", amount: "$150.00", type: "Sent" },
    {
      id: "TXN003",
      time: "2024-02-02 09:15",
      amount: "$320.00",
      type: "Received",
    },
    { id: "TXN004", time: "2024-02-02 11:00", amount: "$50.00", type: "Sent" },
  ];

  return (
    <div className="mx-auto p-5 mt-5 bg-third shadow-lg rounded-lg flex flex-col w-full">
      <h2 className="text-2xl font-semibold mb-4">
        Latest Transaction History
      </h2>

      {/* Header Section */}
      <div className="flex justify-between px-4 py-5 bg-primary text-white font-semibold rounded-lg">
        <p className="w-1/4">ID</p>
        <p className="w-1/4">Time</p>
        <p className="w-1/4">Amount</p>
        <p className="w-1/4 text-right">Type</p>
      </div>

      {/* Transactions List */}
      <div className="flex flex-col gap-y-3 space-y-2  rounded-lg mt-3">
        {transactions.map((txn, index) => (
          <div
            key={index}
            className="flex rounded-lg py-6 justify-between bg-transparent border-muted-foreground items-center px-4 py-4 last:border-none even:bg-primary"
          >
            <p className="w-1/4 text-sm font-medium">{txn.id}</p>
            <p className="w-1/4 text-sm text-white">{txn.time}</p>
            <p className="w-1/4 text-sm font-semibold">{txn.amount}</p>
            <p
              className={`w-1/4 text-sm font-medium text-right ${
                txn.type === "Received" ? "text-green-600" : "text-red-600"
              }`}
            >
              {txn.type}
            </p>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <button className="inline-flex items-center justify-center rounded-xl bg-secondary hover:bg-opacity-80 h-10 px-5 font-medium text-white shadow-xl shadow-orange-400/15 transition-transform duration-200 ease-in-out hover:scale-[0.98] mt-5 ml-auto">
        View All
      </button>
    </div>
  );
}
