import React, { useEffect, useState } from "react";
import "../styles/LivePrices.scss";

function LivePrices() {
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [time, setTime] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:5000");

    socket.onopen = () => {
      console.log(" Connected to backend WebSocket");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.price) {
          setPrice(parseFloat(data.price).toFixed(2));
          setQuantity(parseFloat(data.quantity).toFixed(4));
          setTime(new Date(data.time).toLocaleTimeString());
        }
      } catch (err) {
        console.error("❌ Error parsing WebSocket message:", err);
      }
    };

    socket.onerror = (err) => console.error(" WebSocket error:", err);
    socket.onclose = () => console.log(" WebSocket connection closed");

    return () => socket.close();
  }, []);

  return (
    <div className="live-prices">
      <h2>Live BTC/USDT Price</h2>
      <h3 className="live-prices_value">
        {price ? `$${price}` : "Loading..."}
      </h3>
      <div className="live-prices_details">
        {quantity && <p>Quantity: {quantity}</p>}
        {time && <p>Last Trade: {time}</p>}
      </div>
    </div>
  );
}

export default LivePrices;
