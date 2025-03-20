import Card from "../../send/components/Card";
import ReceiveForm from "../components/ReceiveForm";
import { getSession } from "../../../../utils/session.server";
import { redirect } from "@remix-run/node";
import prisma from "../../../../../prisma/prisma";
import { useLoaderData } from "@remix-run/react";
import Monero from "../../../../utils/Monero.server";
import { useEffect, useState } from "react";
import useStoredValue from "../../components/useStoredValue";

export async function loader({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }
  // get the user's monero accounts and its details, subaadresses will be generated based on the account's index
  const userAccount = await prisma.user.findUnique({
    where: { id: userIdD },
    include: {
      moneroAccounts: {
        select: {
          id: true,
          accountLabel: true,
          accountIndex: true,
          subaddresses: {
            select: {
              accountId: true,
              address: true,
            },
          },
        },
      },
    },
  });
  // return the user's monero accounts and its subaddresses
  return {
    moneroAccounts: userAccount.moneroAccounts,
  };
}
export async function action({ request }) {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  const formData = await request.formData();
  const moneroAccountIndex = formData.get("selectedAccount");
  const monero = new Monero(userIdD);
  const createSubaddress = await monero.createSubAddress(
    Number(moneroAccountIndex),
    "New Subaddress"
  );
  // return the subaddress id to determine the belonging account
  const subaddressID = createSubaddress;
  return { moneroAccountID: subaddressID };
}

export default function Index() {
  // get the data from the loader
  const data = useLoaderData();
  // State for selected account,subaddress will be generated based on this account's index
  const [selectedAccount, setSelectedAccount] = useState(
    data.moneroAccounts[0].id
  );
  const [subadresses, setSubadresses] = useState([]);

  useEffect(() => {
    // get the subaddresses of the selected account
    const subadresses = data.moneroAccounts.find(
      (account) => account.id === selectedAccount
    ).subaddresses;
    setSubadresses(subadresses);
  }, [selectedAccount, data]);
  const fontType = useStoredValue("fontType");
  const colorType = useStoredValue("colourType");
  return (
    <div
      className="mt-5 ml-5"
      style={{ fontFamily: fontType ? fontType : "Inter" }}
    >
      <div
        className="bg-third p-5 rounded-lg"
        style={{ backgroundColor: colorType?.tertiary }}
      >
        <h3 className="font-medium text-xl">Receiving Steps</h3>
        {/* Step Cards */}
        <div className="mt-8 flex justify-between gap-x-5">
          <Card
            step="1"
            header="Select Account"
            body="Choose the account under which you want to generate receiving addresses."
          />
          <Card
            step="2"
            header="Generate Address"
            body="Create a new unique receiving address for this account."
          />
          <Card
            step="3"
            header="Share Address"
            body="Copy and share your Monero address with the sender."
          />
          <Card
            step="4"
            header="Receive & Confirm"
            body="Wait for confirmations and check your account balance."
          />
        </div>
      </div>
      <ReceiveForm
        accounts={data.moneroAccounts}
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
        subadresses={subadresses}
      />
    </div>
  );
}
