import axios from "axios";

// Fetch current Monero price
let cacheCurrentMoneroPrice = {
  data: null,
  timestamp: 0,
};
export async function getCurrentMoneroPrice() {
  const cacheDuration = 60 * 1000; // Cache for 1 minute
  // Check if cached data is still valid
  if (
    cacheCurrentMoneroPrice.data &&
    Date.now() - cacheCurrentMoneroPrice.timestamp < cacheDuration
  ) {
    console.log("Serving from cache.");
    return cacheCurrentMoneroPrice.data;
  }
  const response = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price",
    {
      params: { ids: "monero", vs_currencies: "usd" },
    }
  );
  cacheCurrentMoneroPrice.data = response.data.monero.usd;
  cacheCurrentMoneroPrice.timestamp = Date.now();

  return response.data.monero.usd;
}
// Fetch Monero prices for the last 30 days in one request
export async function getHistoricalMoneroPrice() {
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/coins/monero/market_chart`,
    {
      params: {
        vs_currency: "usd",
        days: 90,
        interval: "daily",
      },
    }
  );
  const prices = response.data.prices.map(([timestamp, price]) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    return { date: formattedDate, price };
  });

  return prices;
}

let cache = {
  data: null,
  timestamp: 0,
};

export async function getHistoricalMoneroPriceWithCache(days = 90) {
  const cacheDuration = 60 * 60 * 1000; // Cache for 1 hour

  // Check if cached data is still valid
  if (cache.data && Date.now() - cache.timestamp < cacheDuration) {
    console.log("Serving from cache.");
    return cache.data;
  }

  console.log("Fetching new data...");
  const prices = await getHistoricalMoneroPrice(days);

  cache.data = prices;
  cache.timestamp = Date.now();

  return prices;
}
