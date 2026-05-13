const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCryptos = async () => {
  const response = await fetch(
    `${BASE_URL}/coins/markets?vs_currency=bdt&order=market_cap_desc&per_page=100&page=1&sparkline=false`
  );

  if (!response.ok) {
    throw new Error("ক্রিপ্টো ডেটা লোড করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};

export const fetchCoinData = async (id) => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  );

  if (!response.ok) {
    throw new Error("কয়েন ডেটা লোড করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};

export const fetchChartData = async (id) => {
  const response = await fetch(
    `${BASE_URL}/coins/${id}/market_chart?vs_currency=bdt&days=7`
  );

  if (!response.ok) {
    throw new Error("চার্ট ডেটা লোড করতে ব্যর্থ হয়েছে");
  }

  return response.json();
};