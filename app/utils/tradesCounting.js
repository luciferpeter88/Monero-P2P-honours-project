export default function countTrades(usersWithTrades) {
  const user = usersWithTrades.map((user) => {
    const allTransactions = user.moneroAccounts.flatMap(
      (acc) => acc.transactions || []
    ); // merge all transactions from a user's accounts into a single array

    const totalTrades = allTransactions.length; // This will be 0 if there are no transactions
    const confirmedTrades = allTransactions.filter(
      (t) => t.status === "confirmed"
    ).length;
    // if there are trades, calculate the success rate
    const successRate =
      totalTrades > 0 ? (confirmedTrades / totalTrades) * 100 : 0;

    return {
      id: user.id,
      username: user.username,
      imgsrc: "https://randomuser.me/api/portraits/women/21.jpg",
      totalTrades, // If no trades exist, this will be 0
      confirmedTrades, // If no confirmed trades exist, this will be 0
      successRate, // If total trades are 0, success rate will be 0%
    };
  });
  return user;
}
