import { Link } from "react-router";
import { useState } from "react";
import { formatPrice, formatMarketCap } from "../utils/formatter";

export const CryptoCard = ({ crypto }) => {
  const [modal, setModal] = useState(null);

  const closeModal = () => setModal(null);

  return (
    <>
      <div className="crypto-card">

        {/* MAIN CLICKABLE AREA */}
        <Link to={`/coin/${crypto.id}`} style={{ textDecoration: "none" }}>
          
          <div className="crypto-header">
            <div className="crypto-info">
              <img src={crypto.image} alt={crypto.name} />
              <div>
                <h3>{crypto.name}</h3>
                <p className="symbol">{crypto.symbol.toUpperCase()}</p>
                <span className="rank">র‍্যাঙ্ক #{crypto.market_cap_rank}</span>
              </div>
            </div>
          </div>

          <div className="crypto-price">
            <p className="price">৳{formatPrice(crypto.current_price)}</p>

            <p
              className={`change ${
                crypto.price_change_percentage_24h >= 0 ? "positive" : "negative"
              }`}
            >
              {crypto.price_change_percentage_24h >= 0 ? "↑" : "↓"}{" "}
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </p>
          </div>

        </Link>

        {/* STATS (CLICKABLE TERMS) */}
        <div className="crypto-stats">

          <div className="stat">
            <span
              className="stat-label clickable"
              onClick={() => setModal("market_cap")}
            >
              মার্কেট ক্যাপ ℹ️
            </span>

            <span className="stat-value">
              ৳{formatMarketCap(crypto.market_cap)}
            </span>
          </div>

          <div className="stat">
            <span
              className="stat-label clickable"
              onClick={() => setModal("volume")}
            >
              লেনদেন ভলিউম ℹ️
            </span>

            <span className="stat-value">
              ৳{formatMarketCap(crypto.total_volume)}
            </span>
          </div>

        </div>
      </div>

      {/* 🔥 MODAL OVERLAY */}
      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>

            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>

            {modal === "market_cap" && (
              <>
<h2>📊 মার্কেট ক্যাপ (Market Capitalization)</h2>

<div className="math-box">
  <p className="math-title">📌 সূত্র (Formula)</p>

  <div className="math-formula">
    Market Cap = Current Price × Circulating Supply
  </div>

  <div className="math-explanation">
    <p>
      👉 এখানে <b>Current Price</b> মানে হলো একটি কয়েনের বর্তমান বাজার মূল্য।
    </p>

    <p>
      👉 <b>Circulating Supply</b> মানে হলো বাজারে বর্তমানে যত কয়েন সক্রিয়ভাবে আছে।
    </p>
  </div>

  <div className="math-result">
    💡 সহজভাবে:  
    মার্কেট ক্যাপ দেখায় একটি ক্রিপ্টোকারেন্সির মোট বাজার মূল্য কত বড় বা ছোট।
  </div>
</div>
              </>
            )}

            {modal === "volume" && (
              <>
                <h2>📈 ২৪ ঘণ্টার ভলিউম</h2>
                <p>
                  গত ২৪ ঘণ্টায় কত টাকা লেনদেন হয়েছে।
                </p>
                <p>
                  বেশি ভলিউম মানে বেশি ট্রেডিং অ্যাক্টিভিটি।
                </p>
              </>
            )}

          </div>
        </div>
      )}
    </>
  );
};