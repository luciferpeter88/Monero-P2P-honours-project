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
    return redirect("/admin");
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

      {/* Main Container / Card */}
      <div className="bg-third rounded mb-6 p-6 flex flex-col gap-y-6 shadow-lg">
        {/* Top Section: Profile + Basic Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={
                user?.imageSrc ||
                "https://divnil.com/wallpaper/iphone5/img/app/6/4/649a066d415bdda4ce2a7088292645e0_b4f0a5157bdc60fc752dee0c0e8deaad_raw.jpg"
              }
              alt="User Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-primary shadow-md"
            />
            {/* Example: Optional badge or status icon */}
            {user.accountStatus === "frozen" && (
              <span className="absolute bottom-1 right-1 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">
                Frozen
              </span>
            )}
          </div>

          {/* Basic Info */}
          <div className="flex-1 space-y-2">
            <p className="text-lg font-semibold">
              {user?.firstName} {user?.lastName}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-semibold">Username:</span> {user.username}
            </p>
            <p>
              <span className="font-semibold">Account Status:</span>{" "}
              <span
                className={`${
                  user.accountStatus === "active"
                    ? "text-green-400"
                    : user.accountStatus === "frozen"
                    ? "text-yellow-400"
                    : "text-red-400"
                } font-semibold`}
              >
                {user.accountStatus}
              </span>
            </p>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-600" />

        {/* Update Account Status Form */}
        <div className="flex flex-col md:flex-row gap-4 md:items-center">
          <Form
            method="post"
            className="flex flex-col md:flex-row items-start md:items-center gap-3"
          >
            <label htmlFor="accountStatus" className="font-semibold">
              Update Account Status:
            </label>
            <select
              name="accountStatus"
              id="accountStatus"
              className="p-2 border border-primary rounded bg-gray-900"
            >
              <option value="active">Active</option>
              <option value="frozen">Frozen</option>
              <option value="closed">Closed</option>
            </select>
            <input type="hidden" name="_method" value="put" />
            <input type="hidden" name="userId" value={user.id} />

            <button
              type="submit"
              className="bg-primary text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Update
            </button>
          </Form>

          {/* Delete User Form */}
          <Form method="post">
            <input type="hidden" name="_method" value="delete" />
            <input type="hidden" name="userId" value={user.id} />
            <button
              type="submit"
              className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-500 transition-colors"
            >
              Delete User
            </button>
          </Form>
        </div>
      </div>
      {/* Accounts */}
      <div className="bg-third rounded-lg mb-6 p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-secondary">
          Monero Accounts
        </h3>
        {user.moneroAccounts?.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-primary">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-secondary">
                    Account ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-secondary">
                    Account Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-secondary">
                    Account Address
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {user.moneroAccounts.map((acc) => (
                  <tr
                    key={acc.id}
                    className="hover:bg-primary transition-colors"
                  >
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      {acc.id}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-secondary">
                      {acc.accountLabel}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm">
                      {acc.accountAddress}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No accounts found.</p>
        )}
      </div>

      <div className="bg-third rounded-lg mb-6 p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-secondary">
          Monero Sub-Accounts
        </h3>
        {user.moneroAccounts?.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-primary">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-secondary">
                    Sub-Account ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-secondary">
                    Account Name
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-secondary">
                    Sub-Account Address
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {user.moneroAccounts?.flatMap((acc) =>
                  acc.subaddresses?.map((sub) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-primary transition-colors"
                    >
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        {sub.id}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        Sub Address of{" "}
                        <span className="text-secondary">
                          {acc.accountLabel}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        {sub.address}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No sub-accounts found.</p>
        )}
      </div>

      {/* Transaction History */}
      <div className="bg-third rounded-lg mb-6 p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4 text-secondary">
          Transaction History
        </h3>
        {user.moneroAccounts?.length ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-primary">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium text-secondary">
                    Transaction ID
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-secondary">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-secondary">
                    Amount (XMR)
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-secondary">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {user.moneroAccounts.map((tx) =>
                  tx.Transaction.length > 0
                    ? tx.Transaction.map((transaction) => (
                        <tr
                          key={transaction.id}
                          className="hover:bg-primary transition-colors"
                        >
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {transaction.id}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {transaction.date}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {transaction.amount}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm">
                            {transaction.status}
                          </td>
                        </tr>
                      ))
                    : null
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-sm text-gray-400">No transactions found.</p>
        )}
      </div>
    </div>
  );
}
