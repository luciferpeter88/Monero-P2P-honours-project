import "../style/style.css";
import React from "react";
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
import Modal from "../components/Modal";
import tradeCounting from "../../../utils/tradesCounting.server";
import getAllAccounts from "../../../utils/getAllAccounts";
import useStoredValue from "../components/useStoredValue";
// read the data from the backend when the page is loaded and pass it to the component
export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }
  const user = await prisma.user.findUnique({
    where: { id: userIdD },
    include: { moneroAccounts: true },
  });
  // get the historical price of Monero using the CoinGecko API with custom caching
  const historicalPrice = await getHistoricalMoneroPriceWithCache();
  // get all accounts of the user
  const accounts = await getAllAccounts(userIdD, user.moneroAccounts);
  // get the market data, like the number of trades, success rate
  const trades = await tradeCounting(userIdD, "all");

  // return the user data and the account data
  return {
    email: user.email,
    name: user.firstName + " " + user.lastName,
    phone: user.phone,

    accounts: accounts,
    market: trades,
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
  const formData = await request.formData();
  const formType = formData.get("formType");
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }
  if (formType === "editMoneroLabel") {
    const accountID = formData.get("editaccount");
    const editMoneroAccountName = formData.get("newAccountName");

    try {
      // Update the MoneroAccount table
      await prisma.moneroAccount.update({
        where: { id: Number(accountID) },
        data: {
          accountLabel: editMoneroAccountName,
        },
      });

      return {
        monero: "Account name was updated",
      };
    } catch (error) {
      return { error: "Failed to update account" }, { status: 500 };
    }
  } else if (formType === "createMoneroAccount") {
    const newAccountName = formData.get("newAccountName");
    const monero = new Monero(userIdD);
    await monero.createAccount(newAccountName);
    return {
      monero: "Account created",
    };
  }
}

export default function Index() {
  // get the data from the backend when the page is loaded
  const data = useLoaderData();
  const [usedaccount, setUsedAccount] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const typography = useStoredValue("typograhpy");

  const fontType = useStoredValue("fontType");
  const colorType = useStoredValue("colourType");
  console.log("fonttype", fontType);

  return (
    <div
      className="mt-5 ml-5"
      style={{ fontFamily: fontType ? fontType : "Inter" }}
    >
      <div
        className="bg-third p-5 rounded-lg"
        style={{ backgroundColor: colorType?.tertiary }}
      >
        <h3
          className="font-medium text"
          style={{
            fontSize: typography?.size.fontSize,
            letterSpacing: typography?.size.lineHeight,
          }}
        >
          {data.name}
        </h3>
        <div className="mt-3 flex gap-x-16 w-full ">
          <UserDetails firstText="Account" lastText={data.email} />
          <UserDetails
            firstText="Phone"
            lastText={data.phone || "not provided"}
          />
          <UserDetails firstText="Accounts" lastText={data.accounts.length} />
          <UserDetails
            firstText="Current Account"
            lastText={data.accounts[usedaccount].accountName}
          />
          <Link to="/dashboard/market" className="ml-auto mt-auto">
            <Button
              className="bg-secondary ml-auto"
              style={{ backgroundColor: colorType?.secondary }}
            >
              Trade
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex mt-5 gap-5">
        <div
          className=" w-max p-5 rounded-lg flex flex-col bg-third"
          style={{ backgroundColor: colorType?.tertiary }}
        >
          <Card
            name={data.name}
            usedAccount={data.accounts[usedaccount].accountName}
            lockedBalance={data.accounts[usedaccount].balance}
            unlockedBalance={data.accounts[usedaccount].unlockedBalance}
          />
          <div className="mt-5 flex">
            <Form method="post">
              <Modal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                title={"Creating"}
              >
                <input
                  type="text"
                  name="newAccountName"
                  placeholder="Enter Account Name"
                  className="w-full p-2 border border-gray-300 rounded bg-transparent mb-4"
                  required
                />
                <input
                  type="hidden"
                  name="formType"
                  value="createMoneroAccount"
                />
              </Modal>
            </Form>
            <Button
              className="bg-secondary ml-auto"
              style={{ backgroundColor: colorType?.secondary }}
              onClick={() => setOpenModal(true)}
            >
              Create Account
            </Button>
          </div>
        </div>
        <div
          className="w-full bg-third p-5 rounded-lg"
          style={{ backgroundColor: colorType?.tertiary }}
        >
          <h2
            className="text-lg font-semibold"
            style={{
              fontSize: typography?.size.fontSize + 1,
              letterSpacing: typography?.size.lineHeight,
            }}
          >
            Accounts
          </h2>
          <div className="mt-5 flex flex-col overflow-scroll h-[25vh]">
            {data.accounts.map((account, index) => (
              <Account
                index={index}
                data={data.accounts}
                account={usedaccount}
                setAccount={setUsedAccount}
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
        <div
          className="w-[75%] h-full bg-third p-5 rounded-lg"
          style={{ backgroundColor: colorType?.tertiary }}
        >
          <Chart chartData={data.moneroApiChart} />
        </div>
        <div
          className="w-[35%] bg-third rounded-lg"
          style={{ backgroundColor: colorType?.tertiary }}
        >
          <Chart2 data={data.accounts} />
        </div>
      </div>
      <div
        className="bg-third p-5 rounded-lg mt-5 flex flex-col"
        style={{ backgroundColor: colorType?.tertiary }}
      >
        <h2
          className="text-2xl font-semibold mb-4"
          style={{
            fontSize: typography?.size.fontSize + 5,
            letterSpacing: typography?.size.lineHeight,
          }}
        >
          Market
        </h2>
        <div className="flex gap-5">
          {data.market.map((market) => (
            <ProfileCard
              key={market.id}
              userID={market.id}
              name={market.username}
              imageSrc={market.imgsrc}
              successRate={market.successRate}
              totalTrades={market.totalTrades}
            />
          ))}
        </div>
        <Link to="/dashboard/market" className="ml-auto mt-auto">
          <Button
            className="ml-auto mt-5 bg-secondary"
            style={{ backgroundColor: colorType?.secondary }}
          >
            Explore
          </Button>
        </Link>
      </div>
      <TransactionHistory
        header="Latest Transaction History"
        data={data.transaction}
      />
    </div>
  );
}
