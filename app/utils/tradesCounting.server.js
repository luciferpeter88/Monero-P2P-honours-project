import prisma from "../../prisma/prisma";

export default async function countTrades(userIdD, user = "all") {
  const usersWithTrades = await prisma.user.findMany({
    where: user === "all" ? { id: { not: userIdD } } : { id: userIdD },
    select: {
      id: true,
      username: true,
      moneroAccounts: {
        select: {
          id: true,
          Transaction: {
            select: { status: true }, // Only get transaction status
          },
        },
      },
    },
  });

  return usersWithTrades.map((user) => {
    const allTransactions = user.moneroAccounts.flatMap(
      (acc) => acc.transactions || []
    ); // merge all transactions from a user's accounts into a single array

    const totalTrades = allTransactions.length; // This will be 0 if there are no transactions
    // filter the transactions to get only the confirmed ones
    const confirmedTrades = allTransactions.filter(
      (t) => t.status === "confirmed"
    ).length;
    // if there are trades, calculate the success rate
    const successRate =
      totalTrades > 0 ? (confirmedTrades / totalTrades) * 100 : 0;

    return {
      id: user.id,
      username: user.username,
      imgsrc: "",
      totalTrades,
      confirmedTrades,
      successRate,
    };
  });
}
