import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Filter from "../components/Filter";
import MoneroTraderCard from "../components/MoneroTraderCard";
import ChatPopup from "../components/ChatPopUp";
// Dummy Data (Replace with actual DB query)
const sellers = [
  {
    id: 1,
    name: "Alice",
    rating: 98,
    price: 120,
    totalTrades: 120,
    tradMin: 0.5,
    tradeMax: 5,
  },
  {
    id: 2,
    name: "Bob",
    rating: 90,
    price: 110,
    totalTrades: 12,
    tradeMin: 0.8,
    tradeMax: 5,
  },
  {
    id: 3,
    name: "Charlie XMR",
    rating: 85,
    price: 105,
    totalTrades: 10,
    tradeMin: 0.5,
    tradeMax: 15,
  },
];
const messages = [];
// Loader Function (Server-Side Filtering)
export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query")?.toLowerCase() || "";
  const rating = url.searchParams.get("rating");
  const minPrice = url.searchParams.get("minPrice");
  const maxPrice = url.searchParams.get("maxPrice");

  let filteredSellers = sellers;

  // Filter by Name
  if (query) {
    filteredSellers = filteredSellers.filter((seller) =>
      seller.name.toLowerCase().includes(query)
    );
  }

  // Filter by Rating
  if (rating) {
    filteredSellers = filteredSellers.filter(
      (seller) => seller.rating >= parseInt(rating) || rating === "all"
    );
  }

  // Filter by Price Range
  if (minPrice) {
    filteredSellers = filteredSellers.filter(
      (seller) => seller.price >= parseFloat(minPrice)
    );
  }
  if (maxPrice) {
    filteredSellers = filteredSellers.filter(
      (seller) => seller.price <= parseFloat(maxPrice)
    );
  }

  return json({ sellers: filteredSellers, messages });
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
