import { useLoaderData, useActionData } from "@remix-run/react";
import Filter from "../components/Filter";
import MoneroTraderCard from "../components/MoneroTraderCard";
import ChatPopup from "../components/ChatPopUp";
import { getSession } from "../../../../utils/session.server";
import { redirect } from "@remix-run/node";
import tradeCounting from "../../../../utils/tradesCounting.server";
// import prisma from "../../../../../prisma/prisma";
import { Use } from "../../context/Context";
import useStoredValue from "../../components/useStoredValue";

// const messages = [{ message: "Testing" }];
// Loader Function (Server-Side Filtering)
export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }
  const trades = await tradeCounting(userIdD, "all");

  // if (recipientId) {
  //   messages = await prisma.message.findMany({
  //     where: {
  //       OR: [
  //         { senderId: userIdD, recipientId: recipientId },
  //         { senderId: recipientId, recipientId: userIdD },
  //       ],
  //     },
  //     orderBy: { createdAt: "asc" },
  //     select: { content: true, senderId: true },
  //   });
  // }

  // const url = new URL(request.url);
  // const query = url.searchParams.get("query")?.toLowerCase() || "";
  // const rating = url.searchParams.get("rating");
  // const minPrice = url.searchParams.get("minPrice");
  // const maxPrice = url.searchParams.get("maxPrice");

  // Filter by Name
  // if (query) {
  //   filteredSellers = filteredSellers.filter((seller) =>
  //     seller.name.toLowerCase().includes(query)
  //   );
  // }

  // // Filter by Rating
  // if (rating) {
  //   filteredSellers = filteredSellers.filter(
  //     (seller) => seller.rating >= parseInt(rating) || rating === "all"
  //   );
  // }

  // // Filter by Price Range
  // if (minPrice) {
  //   filteredSellers = filteredSellers.filter(
  //     (seller) => seller.price >= parseFloat(minPrice)
  //   );
  // }
  // if (maxPrice) {
  //   filteredSellers = filteredSellers.filter(
  //     (seller) => seller.price <= parseFloat(maxPrice)
  //   );
  // }

  return { sellers: trades, loggedInUserID: userIdD };
};
export const action = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }
  const formdata = await request.formData();
  const text = formdata.get("message");
  const receiver = formdata.get("receiver");
  const sender = formdata.get("sender");
  console.log("Action", text, receiver, sender);

  // await prisma.message.create({
  //   data: {
  //     senderId: Number(sender),
  //     recipientId: Number(receiver),
  //     content: text,
  //   },
  // });
  const messages = [{ content: "Puszilom Jaksa fejet!" }];
  return { messages };
};

export default function Index() {
  const { sellers } = useLoaderData();
  const data = useActionData();
  const message = data ? data.messages : [];
  const typography = useStoredValue("typography");
  const fontType = useStoredValue("fontType");
  const headerStyle = {
    fontSize: typography?.size?.fontSize + 2,
    letterSpacing: typography?.size.lineHeight,
  };

  return (
    <div
      className="mt-5 ml-5"
      style={{ fontFamily: fontType ? fontType : "Inter" }}
    >
      <div className="bg-third p-5 rounded-lg flex items-baseline justify-between w-full">
        <h3 className="font-medium text-xl" style={headerStyle}>
          Market
        </h3>
        <Filter />
      </div>
      <div className="mt-5 space-y-4">
        {sellers.length === 0 ? (
          <p className="text-gray-400">No sellers found.</p>
        ) : (
          sellers.map((seller) => (
            <MoneroTraderCard
              seller={seller}
              key={seller.id}
              popup={ChatPopup}
              messages={message}
            />
          ))
        )}
      </div>
    </div>
  );
}
