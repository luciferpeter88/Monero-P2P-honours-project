import { Form, useLoaderData, redirect } from "@remix-run/react";
import prisma from "../../../../../prisma/prisma";
// Example loader for user details
export const loader = async ({ params }) => {
  const userId = params.id;

  const uniqueUser = await prisma.user.findUnique({
    where: {
      id: Number(userId),
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      username: true,
      accountStatus: true,
      imageSrc: true,
      moneroAccounts: {
        select: {
          id: true,
          accountLabel: true,
          accountAddress: true,
          // accountIndex: true,
          subaddresses: true,
          Transaction: true,
        },
      },
    },
  });
  if (uniqueUser?.username === "admin") {
    return {
      status: 404,
      error: "User not found",
    };
  }

  console.log(uniqueUser);

  return uniqueUser;
};
export const action = async ({ request }) => {
  const formdata = await request.formData();
  const userId = formdata.get("userId");
  const accountStatus = formdata.get("accountStatus");
  const method = formdata.get("_method");

  if (method === "put") {
    await prisma.user.update({
      where: {
        id: Number(userId),
      },
      data: {
        accountStatus: accountStatus,
      },
    });
  } else if (method === "delete") {
    await prisma.user.delete({
      where: {
        id: Number(userId),
      },
    });
  }
  return redirect(`/admin/users/${userId}`);
};
export default function Index() {
  const user = useLoaderData();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 px-3 text-secondary">
        User Details
      </h2>

      {/* Basic user info */}
      <div className="bg-third rounded mb-6 p-6 flex flex-col gap-y-3">
        <img
          src={
            user?.imageSrc ||
            "https://divnil.com/wallpaper/iphone5/img/app/6/4/649a066d415bdda4ce2a7088292645e0_b4f0a5157bdc60fc752dee0c0e8deaad_raw.jpg"
          }
          alt="User Profile"
          className="w-32 h-32 rounded-full mb-5"
        />
        <p>
          <span className="font-semibold">Name:</span> {user?.firstName}{" "}
          {user?.lastName}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Username:</span> {user.username}
        </p>
        <p>
          <span className="font-semibold">Account Status:</span>{" "}
          {user.accountStatus}
        </p>
        <Form method="post" className="flex gap-3 items-baseline">
          <label htmlFor="accountStatus" className="font-semibold">
            Update Account Status
          </label>
          <select
            name="accountStatus"
            id="accountStatus"
            className=" p-2 border border-primary rounded"
          >
            <option value="active">Active</option>
            <option value="frozen">Frozen</option>
            <option value="closed">Closed</option>
          </select>
          <input type="hidden" name="_method" value="put" />
          <input type="hidden" name="userId" value={user.id} />

          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded mt-3"
          >
            Update Account Status
          </button>
        </Form>
        <Form method="post" className="flex gap-3 items-baseline">
          <input type="hidden" name="_method" value="delete" />
          <input type="hidden" name="userId" value={user.id} />
          <button
            type="submit"
            className="bg-red-500 text-white py-2 px-4 rounded mt-3"
          >
            Delete User
          </button>
        </Form>
      </div>

      {/* Accounts */}
      <div className="bg-third p-4 rounded mb-6 p-6">
        <h3 className="text-xl font-semibold mb-2">Monero Accounts</h3>
        {user.moneroAccounts?.length ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary">
                <th className="p-2 text-left">Account ID</th>
                <th className="p-2 text-left">Account Name</th>
                <th className="p-2 text-left">Account Address</th>
              </tr>
            </thead>
            <tbody>
              {user.moneroAccounts.map((acc) => (
                <tr
                  key={acc.id}
                  className="border-b border-primary hover:bg-primary transition"
                >
                  <td className="p-2">{acc.id}</td>
                  <td className="p-2 text-secondary">{acc.accountLabel}</td>
                  <td className="p-2">{acc.accountAddress}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No accounts found.</p>
        )}
      </div>
      <div className="bg-third p-4 rounded mb-6 p-6">
        <h3 className="text-xl font-semibold mb-2">Monero Sub-Accounts</h3>
        {user.moneroAccounts?.length ? (
          <table className="w-full">
            <thead>
              <tr className="border-b border-primary">
                <th className="p-2 text-left">Account ID</th>
                <th className="p-2 text-left">Account Name</th>
                <th className="p-2 text-left">Account Address</th>
              </tr>
            </thead>
            <tbody>
              {user.moneroAccounts?.map((acc) =>
                acc.subaddresses?.map((sub) => (
                  <tr
                    key={sub.id}
                    className="border-b border-primary hover:bg-primary transition"
                  >
                    <td className="p-2">{sub.id}</td>
                    <td className="p-2">
                      Sub Adress of
                      <span className="text-secondary">
                        {" "}
                        {acc.accountLabel}
                      </span>{" "}
                    </td>
                    <td className="p-2">{sub.address}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : (
          <p>No sub-accounts found.</p>
        )}
      </div>
      {/* Transaction History */}
      <div className="bg-third p-6 rounded mb-6">
        <h3 className="text-xl font-semibold mb-2">Transaction History</h3>
        {user.moneroAccounts?.length ? (
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
              {user.moneroAccounts.map((tx) =>
                tx.Transaction.length > 0
                  ? tx.Transaction.map((transaction) => (
                      <tr
                        key={transaction.id}
                        className="border-b border-primary hover:bg-primary transition"
                      >
                        <td className="p-2">{transaction.id}</td>
                        <td className="p-2">{transaction.date}</td>
                        <td className="p-2">{transaction.amount}</td>
                        <td className="p-2">{transaction.status}</td>
                      </tr>
                    ))
                  : null
              )}
            </tbody>
          </table>
        ) : (
          <p>No transactions found.</p>
        )}
      </div>
    </div>
  );
}
