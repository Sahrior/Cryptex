import { useNavigate, useParams } from "react-router";
import { fetchChartData, fetchCoinData } from "../api/coinGecko";
import { useEffect, useState } from "react";
import { formatMarketCap, formatPrice } from "../utils/formatter";
import {
  CartesianGrid,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  Tooltip,
} from "recharts";

const USD_TO_BDT = 120; // simple fallback rate (tumi chaile update korte parba)

export const CoinDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coin, setCoin] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCoinData();
    loadChartData();
  }, [id]);

  const loadCoinData = async () => {
    try {
      const data = await fetchCoinData(id);
      setCoin(data);
    } catch (err) {
      console.error("ক্রিপ্টো ডেটা লোড করতে সমস্যা হয়েছে:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const loadChartData = async () => {
    try {
      const data = await fetchChartData(id);

      const formattedData = data.prices.map((price) => ({
        time: new Date(price[0]).toLocaleDateString("bn-BD", {
          month: "short",
          day: "numeric",
        }),
        price: (price[1] * USD_TO_BDT).toFixed(2),
      }));

      setChartData(formattedData);
    } catch (err) {
      console.error("চার্ট ডেটা লোড করতে সমস্যা হয়েছে:", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner"></div>
          <p>লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="app">
        <div className="no-results">
          <p>কয়েন পাওয়া যায়নি</p>
          <button onClick={() => navigate("/")}>ফিরে যান</button>
        </div>
      </div>
    );
  }

  const priceChange = coin.market_data.price_change_percentage_24h || 0;
  const isPositive = priceChange >= 0;

  const priceBDT = coin.market_data.current_price.usd * USD_TO_BDT;
  const highBDT = coin.market_data.high_24h.usd * USD_TO_BDT;
  const lowBDT = coin.market_data.low_24h.usd * USD_TO_BDT;

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>🚀 ক্রিপ্টো ট্র্যাকার</h1>
            <p>রিয়েল-টাইম ক্রিপ্টোকারেন্সি ডেটা</p>
          </div>

          <button onClick={() => navigate("/")} className="back-button">
            ← ফিরে যান
          </button>
        </div>
      </header>

      <div className="coin-detail">
        <div className="coin-header">
          <div className="coin-title">
            <img src={coin.image.large} alt={coin.name} />
            <div>
              <h1>{coin.name}</h1>
              <p className="symbol">{coin.symbol.toUpperCase()}</p>
            </div>
          </div>

          <span className="rank">
            র‍্যাঙ্ক #{coin.market_data.market_cap_rank}
          </span>
        </div>

        {/* PRICE SECTION */}
        <div className="coin-price-section">
          <div className="current-price">
            <h2>{formatPrice(priceBDT)}</h2>

            <span className={`change-badge ${isPositive ? "positive" : "negative"}`}>
              {isPositive ? "↑" : "↓"} {Math.abs(priceChange).toFixed(2)}%
            </span>
          </div>

          <div className="price-ranges">
            <div className="price-range">
              <span className="range-label">২৪ ঘণ্টার সর্বোচ্চ</span>
              <span className="range-value">{formatPrice(highBDT)}</span>
            </div>

            <div className="price-range">
              <span className="range-label">২৪ ঘণ্টার সর্বনিম্ন</span>
              <span className="range-value">{formatPrice(lowBDT)}</span>
            </div>
          </div>
        </div>

        {/* CHART */}
        <div className="chart-section">
          <h3>৭ দিনের প্রাইস চার্ট</h3>

          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />
              <YAxis domain={["auto", "auto"]} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="price"
                stroke="#4f46e5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">মার্কেট ক্যাপ</span>
            <span className="stat-value">
              {formatMarketCap(coin.market_data.market_cap.usd * USD_TO_BDT)}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">ভলিউম (২৪ ঘণ্টা)</span>
            <span className="stat-value">
              {formatMarketCap(coin.market_data.total_volume.usd * USD_TO_BDT)}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">সার্কুলেটিং সাপ্লাই</span>
            <span className="stat-value">
              {coin.market_data.circulating_supply?.toLocaleString() || "N/A"}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">টোটাল সাপ্লাই</span>
            <span className="stat-value">
              {coin.market_data.total_supply?.toLocaleString() || "N/A"}
            </span>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>ডেটা CoinGecko API থেকে নেওয়া • প্রতি ৩০ সেকেন্ডে আপডেট হয়</p>
      </footer>
    </div>
  );
};