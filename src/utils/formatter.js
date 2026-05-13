const USD_TO_BDT = 120;
const CURRENCY = "৳";

export const formatPrice = (price) => {
  if (!price && price !== 0) return "N/A";

  const bdtPrice = price * USD_TO_BDT;

  if (bdtPrice < 0.01) return `${CURRENCY}${bdtPrice.toFixed(8)}`;

  return (
    new Intl.NumberFormat("bn-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(bdtPrice) + ` ${CURRENCY}`
  );
};

export const formatMarketCap = (value) => {
  if (!value && value !== 0) return "N/A";

  const bdt = value * USD_TO_BDT;

  if (bdt >= 1e12) return `${(bdt / 1e12).toFixed(2)} ট্রিলিয়ন ৳`;
  if (bdt >= 1e9) return `${(bdt / 1e9).toFixed(2)} বিলিয়ন ৳`;
  if (bdt >= 1e6) return `${(bdt / 1e6).toFixed(2)} মিলিয়ন ৳`;

  return `${new Intl.NumberFormat("bn-BD").format(bdt)} ৳`;
};