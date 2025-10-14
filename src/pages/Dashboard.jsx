import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import LivePrices from "../components/LivePrices";
import TradeForm from "../components/TradeForm";
import axios from "axios";
import "../styles/Dashboard.scss";

function Dashboard() {
  const { user, authToken, logout } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(user?.balance || 0);

  // Fetch trade history
  const fetchHistory = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/trade/history", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setHistory(res.data);
    } catch (err) {
      console.error("Fetch history error:", err);
    }
  };

  // Fetch updated user balance
  const fetchUser = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setBalance(res.data.balance);
    } catch (err) {
      console.error("Fetch user error:", err);
    }
  };

  useEffect(() => {
    fetchHistory();
    fetchUser();

    // Connect to WebSocket for real-time updates
    const ws = new WebSocket("ws://localhost:5000");

    ws.onmessage = (event) => {
      try {
        const tradeData = JSON.parse(event.data);

        // Refresh history and balance when a new trade happens
        if (tradeData.symbol === "BTC/USDT") {
          fetchHistory();
          fetchUser();
        }
      } catch (err) {
        console.error("WebSocket message error:", err);
      }
    };

    ws.onclose = () => console.log(" WebSocket disconnected");
    return () => ws.close();
  }, [authToken]);

  return (
    <div className="dashboard">
      <header className="dashboard_header">
        <div>
          <h2 className="dashboard_welcome">
            Welcome, <span>{user?.name}</span>
          </h2>
          <p className="dashboard_balance">
            Balance: <span>${balance.toFixed(2)}</span>
          </p>
          <button className="dashboard_logout" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <section className="dashboard_prices">
        <LivePrices />
      </section>

      <section className="dashboard_trade">
        <TradeForm type="BUY" />
        <TradeForm type="SELL" />
      </section>

      <section className="dashboard_history">
        <h3>📜 Transaction History</h3>
        {history.length === 0 ? (
          <p className="dashboard_empty">No trades yet.</p>
        ) : (
          <ul className="dashboard_list">
            {history.map((tx) => (
              <li
                key={tx._id}
                className={`dashboard_item ${
                  tx.type.toLowerCase() === "buy"
                    ? "dashboard_item--buy"
                    : "dashboard_item--sell"
                }`}
              >
                <span className="dashboard_symbol">{tx.symbol}</span>
                <span className="dashboard_type">{tx.type}</span>
                <span className="dashboard_details">
                  {tx.quantity} @ ${tx.price}
                </span>
                <span className="dashboard_time">
                  {new Date(tx.timestamp).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
