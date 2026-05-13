import { useEffect, useState } from "react";
import { fetchCryptos } from "../api/coinGecko";
import { CryptoCard } from "../components/CryptoCard";

export const Home = () => {
  const [cryptoList, setCryptoList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [sortBy, setSortBy] = useState("market_cap_rank");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchCryptoData(); // initial load

    const interval = setInterval(fetchCryptoData, 30000); // 30 sec (safe)

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    filterAndSort();
  }, [sortBy, cryptoList, searchQuery]);

  const fetchCryptoData = async () => {
    try {
      const data = await fetchCryptos();
      setCryptoList(data);
    } catch (err) {
      console.error("ক্রিপ্টো ডেটা লোড করতে সমস্যা হয়েছে:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSort = () => {
    let filtered = cryptoList.filter(
      (crypto) =>
        crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return a.current_price - b.current_price;
        case "price_desc":
          return b.current_price - a.current_price;
        case "change":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        case "market_cap":
          return a.market_cap - b.market_cap;
        default:
          return a.market_cap_rank - b.market_cap_rank;
      }
    });

    setFilteredList(filtered);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <h1>🚀 ক্রিপ্টো ট্র্যাকার</h1>
            <p>রিয়েল-টাইম ক্রিপ্টোকারেন্সি ডেটা</p>
          </div>

          <div className="search-section">
            <input
              type="text"
              placeholder="ক্রিপ্টো সার্চ করুন..."
              className="search-input"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
            />
          </div>
        </div>
      </header>

      <div className="controls">
        <div className="filter-group">
          <label>সোর্ট করুন:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="market_cap_rank">র‍্যাঙ্ক</option>
            <option value="name">নাম</option>
            <option value="price">দাম (কম থেকে বেশি)</option>
            <option value="price_desc">দাম (বেশি থেকে কম)</option>
            <option value="change">২৪ ঘণ্টা পরিবর্তন</option>
            <option value="market_cap">মার্কেট ক্যাপ</option>
          </select>
        </div>

        <div className="view-toggle">
          <button
            className={viewMode === "grid" ? "active" : ""}
            onClick={() => setViewMode("grid")}
          >
            গ্রিড
          </button>

          <button
            className={viewMode === "list" ? "active" : ""}
            onClick={() => setViewMode("list")}
          >
            লিস্ট
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="loading">
          <div className="spinner" />
          <p>লোড হচ্ছে...</p>
        </div>
      ) : (
        <div className={`crypto-container ${viewMode}`}>
          {filteredList.map((crypto) => (
            <CryptoCard crypto={crypto} key={crypto.id} />
          ))}
        </div>
      )}

      <footer className="footer">
        <p>ডেটা CoinGecko API থেকে নেওয়া • প্রতি ৩০ সেকেন্ডে আপডেট হয়</p>
      </footer>
    </div>
  );
};