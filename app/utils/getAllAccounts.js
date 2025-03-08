import Monero from "./Monero.server";

export default async function getAllAccounts(userIdD, userAccounts) {
  const monero = new Monero(userIdD);
  return await Promise.all(
    userAccounts.map(async (user) => {
      // Get the balance for each account
      const balance = await monero.getBalance(user.accountIndex);

      // Return the account details
      return {
        id: user.id,
        accountName: user.accountLabel,
        accountAddress: user.accountAddress,
        balance: balance.balance,
        unlockedBalance: balance.unlocked_balance,
      };
    })
  );
}
