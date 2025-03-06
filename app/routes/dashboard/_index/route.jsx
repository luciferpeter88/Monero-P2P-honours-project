import "../style/style.css";
import UserDetails from "../components/UserDetails";
import Card from "../components/Card";
import Account from "../components/Accounts";
import Chart from "../components/Chart";
import Chart2 from "../components/Chart2";
import TransactionHistory from "../components/Transaction";
import ProfileCard from "../components/ProfileCard";
import { Button } from "../../../../src/components/components/ui/button";
import { getSession } from "../../../utils/session.server";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import prisma from "../../../../prisma/prisma";
import { useLoaderData } from "@remix-run/react";
import { getHistoricalMoneroPriceWithCache } from "../../../utils/moneroPrice";
import Monero from "../../../utils/Monero.server";
// read the data from the backend when the page is loaded and pass it to the component
export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }
  const user = await prisma.user.findUnique({
    where: { id: userIdD },
  });
  // const currentPrice = await getCurrentMoneroPrice();
  const historicalPrice = await getHistoricalMoneroPriceWithCache();
  return {
    email: user.email,
    name: user.firstName + " " + user.lastName,
    phone: user.phone,

    accounts: [
      {
        id: 1,
        accountName: "Primary",
        accountAddress: "86vWpt....jjnj40",
        balance: 9.377160181,
      },
      {
        id: 2,
        accountName: "Business",
        accountAddress: "2323ut....jjnj40",
        balance: 2.377160181,
      },
      {
        id: 3,
        accountName: "Hidden Services",
        accountAddress: "86876....xjnj40",
        balance: 7.377160181,
      },
    ], // will be fetched from MoneroAccount table
    market: [
      {
        userId: 1,
        userName: "Judit Eisendreich",
        imageSrc: "https://randomuser.me/api/portraits/women/21.jpg",
        successRate: 98,
        totalTrades: 120,
      },
      {
        userId: 2,
        userName: "Judit Eisendreich",
        imageSrc: "https://randomuser.me/api/portraits/women/21.jpg",
        successRate: 58,
        totalTrades: 12,
      },
      {
        userId: 3,
        userName: "Judit Eisendreich",
        imageSrc: "https://randomuser.me/api/portraits/women/21.jpg",
        successRate: 100,
        totalTrades: 10,
      },
      {
        userId: 4,
        userName: "Judit Eisendreich",
        imageSrc: "https://randomuser.me/api/portraits/women/21.jpg",
        successRate: 95,
        totalTrades: 182,
      },
    ], // will be fetched from Feedback and User tables
    moneroApiChart: historicalPrice,
    transaction: [
      {
        id: 1,
        time: "2021-10-10 12:00:00",
        transactionId: "0x412313...hbdu12rex",
        amount: 2.3,
        addressFrom: "0x1234...1234",
        addressTo: "0x1234...1234",
        remarks: "Payment for services",
      },
      {
        id: 2,
        time: "2021-12-10 12:00:00",
        transactionId: "0x412355...hbdu12pqy",
        amount: 5.3,
        addressFrom: "0x1234...9456",
        addressTo: "0x1234...0176",
        remarks: "Payment for goods",
      },
    ], // will be fetched from Transaction table
  };
}

export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }
  console.log("Creating account for user:", userIdD);
  const monero = new Monero(userIdD);
  await monero.createAccount("Primary");
  return {
    monero: "Account created",
  };
}

export default function Index() {
  // get the data from the backend when the page is loaded
  const data = useLoaderData();

  return (
    <div className="mt-5 ml-5">
      <div className="bg-third p-5 rounded-lg">
        <h3 className="font-medium">{data.name}</h3>
        <div className="mt-3 flex gap-x-16 w-full ">
          <UserDetails firstText="Account" lastText={data.email} />
          <UserDetails
            firstText="Phone"
            lastText={data.phone || "not provided"}
          />
          <UserDetails firstText="Accounts" lastText={data.accounts.length} />
          <UserDetails
            firstText="Current Account"
            lastText={data.accounts[0].accountName}
          />
          <Link to="/dashboard/market" className="ml-auto mt-auto">
            <Button className="bg-secondary ml-auto">Trade</Button>
          </Link>
        </div>
      </div>
      <div className="flex mt-5 gap-5">
        <div className=" w-max p-5 rounded-lg flex flex-col bg-third">
          <Card />
          <div className="mt-5 flex">
            <Form method="post">
              <Button className="bg-secondary ml-auto" type="submit">
                Create Account
              </Button>
            </Form>
          </div>
        </div>
        <div className="w-full bg-third p-5 rounded-lg">
          <h2 className="text-lg font-semibold">Accounts</h2>
          <div className="mt-5 flex flex-col">
            {data.accounts.map((account) => (
              <Account
                key={account.id}
                id={account.id}
                AccountType={account.accountName}
                accountAddress={account.accountAddress}
                balance={account.balance}
              />
            ))}
          </div>
        </div>
      </div>
      <div className=" mt-5 rounded-lg flex h-[55vh] gap-5">
        <div className="w-[75%] h-full bg-third p-5 rounded-lg">
          <Chart chartData={data.moneroApiChart} />
        </div>
        <div className="w-[35%] bg-third rounded-lg">
          <Chart2 />
        </div>
      </div>
      <div className="bg-third p-5 rounded-lg mt-5 flex flex-col">
        <h2 className="text-2xl font-semibold mb-4">Market</h2>
        <div className="flex gap-5">
          {data.market.map((market) => (
            <ProfileCard
              key={market.userId}
              name={market.userName}
              imageSrc={market.imageSrc}
              successRate={market.successRate}
              totalTrades={market.totalTrades}
            />
          ))}
        </div>
        <Button className="ml-auto mt-5 bg-secondary">Explore</Button>
      </div>
      <TransactionHistory
        header="Latest Transaction History"
        data={data.transaction}
      />
    </div>
  );
}
