import { useLoaderData } from "@remix-run/react";
import Filter from "../components/Filter";
import MoneroTraderCard from "../components/MoneroTraderCard";
import ChatPopup from "../components/ChatPopUp";
import { getSession } from "../../../../utils/session.server";
import { redirect } from "@remix-run/node";
import tradeCounting from "../../../../utils/tradesCounting.server";

const messages = [{ message: "Testing" }];
// Loader Function (Server-Side Filtering)
export const loader = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const userIdD = session.get("user_id");
  if (!userIdD) {
    return redirect("/");
  }
  const trades = await tradeCounting(userIdD, "all");
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

  return { sellers: trades, messages, loggedInUserID: userIdD };
};

export default function Index() {
  const { sellers } = useLoaderData();
  return (
    <div className="mt-5 ml-5">
      <div className="bg-third p-5 rounded-lg flex items-baseline justify-between w-full">
        <h3 className="font-medium text-xl">Market</h3>
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
            />
          ))
        )}
      </div>
    </div>
  );
}
