import { useLoaderData, Link } from "@remix-run/react";
import prisma from "../../../../prisma/prisma";
import React from "react";

export const loader = async () => {
  // Fetch some admin stats or overview data here

  const userCount = await prisma.user.count();
  const transaction = await prisma.transaction.count();
  const data = {
    totalUsers: userCount,
    totalTransactions: transaction,
  };
  const user = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      accountStatus: true,
    },
  });
  return { data, user };
};

export default function Index() {
  const data = useLoaderData();
  return (
    <React.Fragment>
      <div className="bg-third p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary p-4 rounded-lg">
            <h3 className="text-xl">Total Users</h3>
            <p className="text-3xl font-semibold text-orange-400">
              {data?.data.totalUsers}
            </p>
          </div>
          <div className="bg-primary p-4 rounded-lg">
            <h3 className="text-xl">Total Transactions</h3>
            <p className="text-3xl font-semibold text-orange-400">
              {data?.data.totalTransactions}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 bg-third p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Registered Users</h2>
        <div className="bg- p-4 rounded">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-2 text-left">ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Account Status</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.user.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-700 hover:bg-primary transition"
                >
                  <td className="p-2">{user.id}</td>
                  <td className="p-2">{user.username}</td>
                  <td className="p-2">{user.email}</td>
                  <td className="p-2">{user.accountStatus}</td>

                  <td className="p-2">
                    <Link
                      to={`/admin/users/${user.id}`}
                      className="text-orange-400 hover:text-orange-300"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}
