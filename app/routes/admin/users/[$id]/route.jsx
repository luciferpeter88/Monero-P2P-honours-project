import { useLoaderData } from "@remix-run/react";

// Example loader for user details
export const loader = async ({ params }) => {
  const userId = params.id;

  const mockUserData = {
    id: userId,
    name: "Alice",
    email: "alice@example.com",
    // You can have nested subaccounts, e.g.:
    subAccounts: [
      { id: "XMR-ABC123", balance: 12.5 },
      { id: "XMR-XYZ789", balance: 3.2 },
    ],
    transactions: [
      { id: "tx1", date: "2025-03-21", amount: 1.2, status: "Completed" },
      { id: "tx2", date: "2025-03-20", amount: 0.8, status: "Pending" },
    ],
    chatHistory: [
      { sender: "Alice", text: "Hi, need help with my account." },
      { sender: "Admin", text: "Sure, what's going on?" },
    ],
  };

  return mockUserData;
};

export default function Index() {
  const user = useLoaderData();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 px-3 text-secondary">
        User Details
      </h2>

      {/* Basic user info */}
      <div className="bg-third rounded mb-6 p-6">
        <h3 className="text-xl font-semibold mb-2">Profile</h3>
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
      </div>

      {/* Sub-Accounts */}
      <div className="bg-third p-4 rounded mb-6 p-6">
        <h3 className="text-xl font-semibold mb-2">Sub-Accounts</h3>
        {user.subAccounts?.length ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary">
                <th className="p-2 text-left">Account ID</th>
                <th className="p-2 text-left">Balance (XMR)</th>
              </tr>
            </thead>
            <tbody>
              {user.subAccounts.map((acc) => (
                <tr
                  key={acc.id}
                  className="border-b border-primary hover:bg-primary transition"
                >
                  <td className="p-2">{acc.id}</td>
                  <td className="p-2">{acc.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No sub-accounts found.</p>
        )}
      </div>

      {/* Transaction History */}
      <div className="bg-third p-6 rounded mb-6">
        <h3 className="text-xl font-semibold mb-2">Transaction History</h3>
        {user.transactions?.length ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary">
                <th className="p-2 text-left">Transaction ID</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Amount (XMR)</th>
                <th className="p-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {user.transactions.map((tx) => (
                <tr
                  key={tx.id}
                  className="border-b border-primary hover:bg-primary transition"
                >
                  <td className="p-2">{tx.id}</td>
                  <td className="p-2">{tx.date}</td>
                  <td className="p-2">{tx.amount}</td>
                  <td className="p-2">{tx.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found.</p>
        )}
      </div>

      {/* Chat History */}
      <div className="bg-third p-6 rounded">
        <h3 className="text-xl font-semibold mb-2">Chat History</h3>
        {user.chatHistory?.length ? (
          <div className="space-y-2">
            {user.chatHistory.map((message, i) => (
              <div key={i} className="flex items-start">
                <span className="font-semibold mr-2">{message.sender}:</span>
                <span>{message.text}</span>
              </div>
            ))}
          </div>
        ) : (
          <p>No chat messages found.</p>
        )}
      </div>
    </div>
  );
}
