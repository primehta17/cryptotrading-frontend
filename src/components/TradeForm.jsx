import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "../styles/TradeForm.scss";

function TradeForm({ type }) {
  const [symbol, setSymbol] = useState("BTCUSDT");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { authToken } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!quantity || quantity <= 0) {
      setMessage("❌ Please enter a valid quantity");
      setLoading(false);
      return;
    }

    try {
      const { data: ticker } = await axios.get(
        "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
      );
      const price = parseFloat(ticker.price);

      const res = await axios.post(
        `http://localhost:5000/api/trade/${type.toLowerCase()}`,
        { symbol, quantity, price },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(` ${type} successful!`);
      setQuantity("");
    } catch (err) {
      console.error("Trade error:", err);
      setMessage(
        err.response?.data?.message || " Trade failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={`trade-form trade-form--${type.toLowerCase()}`} onSubmit={handleSubmit}>
      <h3>{type} Trade</h3>

      <div className="trade-form_group">
        <label>Symbol</label>
        <input value={symbol} disabled />
      </div>

      <div className="trade-form_group">
        <label>Quantity</label>
        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
          step="any"
          min="0"
          required
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : type}
      </button>

      {message && <p className="trade-form_message">{message}</p>}
    </form>
  );
}

export default TradeForm;
