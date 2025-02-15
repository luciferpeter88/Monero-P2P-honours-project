import TransactionSearch from "../components/SearchTransactions";
import TransactionHistory from "../../components/Transaction";
import React from "react";
export default function Index() {
  const transactions = [
    {
      time: "13/03/24 - 20:54:29",
      transactionId: "0x412313...hbdu12rex",
      amount: "2.3",
      addressFrom: "0x412313...hbdu12rex",
      addressTo: "16asfzv6...hbdu12rex",
      remarks: "-",
    },
    {
      time: "13/03/24 - 20:54:29",
      transactionId: "0x412313...hbdu12rex",
      amount: "2.3",
      addressFrom: "0x412313...hbdu12rex",
      addressTo: "16asfzv6...hbdu12rex",
      remarks: "-",
    },
    {
      time: "13/03/24 - 20:54:29",
      transactionId: "0x412313...hbdu12rex",
      amount: "2.3",
      addressFrom: "0x412313...hbdu12rex",
      addressTo: "16asfzv6...hbdu12rex",
      remarks: "-",
    },
    {
      time: "13/03/24 - 20:54:29",
      transactionId: "0x412313...hbdu12rex",
      amount: "2.3",
      addressFrom: "0x412313...hbdu12rex",
      addressTo: "16asfzv6...hbdu12rex",
      remarks: "-",
    },
  ];
  return (
    <React.Fragment>
      <div className="mt-5 ml-5 bg-third p-5 rounded-lg">
        <h3 className="font-medium text-xl">Transaction History</h3>
        <p className=" text-muted-foreground text-sm mt-2">
          View All Your Transactions
        </p>
        <TransactionSearch />
      </div>
      <div className="bg-third mt-5 ml-5 rounded-lg">
        <TransactionHistory data={transactions} />
      </div>
    </React.Fragment>
  );
}
